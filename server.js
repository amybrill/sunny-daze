const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const fs = require('fs'); // Added to check if files exist
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName, clientUrl, couponCode } = req.body;

    try {
        // 1. Clean up the URL to prevent double slashes
        const baseUrl = clientUrl.replace(/\/$/, "");
        
        // 2. Set the default fallback
        let successUrl = `${baseUrl}/confirmation.html`;

        // 3. Conditional Logic with File-Exists Check
        if (serviceName.includes('Soul Urge')) {
            if (fs.existsSync(path.join(__dirname, 'spirit-board.html'))) {
                successUrl = `${baseUrl}/spirit-board.html`;
            }
        } else if (serviceName.includes('Lucky Number')) {
            if (fs.existsSync(path.join(__dirname, 'Lucky-picks.html'))) {
                successUrl = `${baseUrl}/Lucky-picks.html`;
            }
        } else if (serviceName.includes('Quantum')) {
            successUrl = `${baseUrl}/index.html?unlocked=true`;
        }

        // Coupon shortcut logic
        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            return res.json({ url: successUrl });
        }

        // 4. Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: baseUrl,
            metadata: { 
                buyer_name: userName || "Guest",
                buyer_email: userEmail || "No Email",
                service: serviceName
            }
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: "Checkout error." });
    }
});

// Primary route for index
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html')); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); 
});
