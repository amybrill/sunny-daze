const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path'); // Added to handle file paths logically
const app = express();

app.use(cors());
app.use(express.json());

// Logic: Serve static files (index.html, ball.png, etc.) from the root directory
app.use(express.static(__dirname));

// Logic: Explicitly serve index.html when someone visits the main URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;

    // STEP 1: Define where people go after payment
    // Default to the 24-hour notice page for Timeline, Trinity, and Compatibility
    let successUrl = `${clientUrl}/confirmation.html`; 
    
    // STEP 2: Logic for specific instant-access pages
    if (serviceName.includes('Soul Urge')) {
        // Sends them to the Spirit Board results
        successUrl = `${clientUrl}/spirit-board.html`; 
    } else if (serviceName.includes('Lucky Number')) {
        // Sends them to the Lottery Generator results
        successUrl = `${clientUrl}/lucky-picks.html`;
    } else if (serviceName.includes('Quantum')) {
        // Sends them back to main page and triggers the UNLOCK script
        successUrl = `${clientUrl}?unlocked=true`;
    }

    try {
        // STEP 3: Create the Stripe Session
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            
            // This line enables the "Cosmic" coupon code box
            allow_promotion_codes: true, 
            
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
