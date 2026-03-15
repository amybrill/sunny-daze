require('dotenv').config(); // Added this so it can find your Stripe Key
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Added this to fix the white screen

// Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;

    let successUrl = `${clientUrl}/confirmation.html`; 
    
    if (serviceName.includes('Soul Urge')) {
        successUrl = `${clientUrl}/spirit-board.html`; 
    } else if (serviceName.includes('Lucky Number')) {
        successUrl = `${clientUrl}/lucky-picks.html`;
    } else if (serviceName.includes('Quantum')) {
        successUrl = `${clientUrl}?unlocked=true`;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true, 
            
            // CRITICAL: This allows the 100% off coupon to work without a credit card
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

const PORT = process.env.PORT || 8080; // Railway prefers 8080
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
