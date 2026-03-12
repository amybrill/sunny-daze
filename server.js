const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve all static files (images, html, css) from the main folder
app.use(express.static(__dirname));

// Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl, couponCode } = req.body;

    try {
        // STEP 1: Define the success paths
        let successUrl = `${clientUrl}/confirmation.html`; 
        
        if (serviceName.includes('Soul Urge') || serviceName.includes('Quantum')) {
            successUrl = `${clientUrl}/index.html?unlocked=true`; 
        } else if (serviceName.includes('Lucky Number')) {
            successUrl = `${clientUrl}/index.html?lottery=true`;
        }

        // STEP 2: Restore the Coupon Logic
        // If the user enters "cosmic", send them to the success URL immediately for free
        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            console.log(`Coupon applied for ${userEmail}: Redirecting to ${successUrl}`);
            return res.json({ url: successUrl });
        }

        // STEP 3: Regular Stripe Session (if no valid coupon)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: clientUrl,
            metadata: { 
                serviceName: serviceName,
                customerEmail: userEmail 
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
