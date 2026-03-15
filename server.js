require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;

    // STEP 1: Define where people go after payment
    let successUrl = `${clientUrl}/confirmation.html`; 
    
    // STEP 2: Logic for specific instant-access pages
    if (serviceName.includes('Soul Urge')) {
        successUrl = `${clientUrl}/spirit-board.html`; 
    } else if (serviceName.includes('Lucky Number')) {
        successUrl = `${clientUrl}/lucky-picks.html`;
    } else if (serviceName.includes('Quantum')) {
        successUrl = `${clientUrl}?unlocked=true`;
    }

    try {
        // STEP 3: Create the Stripe Session
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            
            // This enables the coupon code box
            allow_promotion_codes: true, 
            
            // CRITICAL: This allows $0.00 checkouts (DESTINY coupon) to work
            payment_method_collection: 'if_required', 
            
            success_url: successUrl,
            cancel_url: clientUrl,
            metadata: { 
                serviceName: serviceName,
                customerEmail: userEmail 
            }
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
