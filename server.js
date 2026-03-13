const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// VERSION CHECK: 1.0.5 - Emergency Stripe Fix
console.log("SERVER STARTING: Version 1.0.5 - Customer Data Fix Active");

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName, clientUrl, couponCode } = req.body;

    try {
        const baseUrl = clientUrl.replace(/\/$/, "");
        let successUrl = `${baseUrl}/confirmation.html`;

        // Success Page Logic
        if (serviceName && serviceName.includes('Soul Urge')) {
            if (fs.existsSync(path.join(__dirname, 'spirit-board.html'))) {
                successUrl = `${baseUrl}/spirit-board.html`;
            }
        } else if (serviceName && (serviceName.includes('Lucky Number') || serviceName.includes('Lottery'))) {
            if (fs.existsSync(path.join(__dirname, 'Lucky-picks.html'))) {
                successUrl = `${baseUrl}/Lucky-picks.html`;
            }
        }

        // Coupon Logic
        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            return res.json({ url: successUrl });
        }

        // THE FIX: We create a completely fresh object and only add keys that HAVE values.
        const sessionOptions = {
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: baseUrl,
            metadata: {
                buyer_name: userName && userName.trim() !== "" ? userName : "Guest",
                service: serviceName || "General"
            }
        };

        // ONLY add email if it exists. NEVER send an empty string.
        if (userEmail && userEmail.trim() !== "") {
            sessionOptions.customer_email = userEmail.trim();
        }

        // CRITICAL: We DO NOT add 'customer_data' here. 
        // If Stripe is still seeing it, it's because the old code is still running.

        const session = await stripe.checkout.sessions.create(sessionOptions);
        res.json({ url: session.url });

    } catch (error) {
        console.error("STRIPE ERROR LOG:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server live on port ${PORT}`); });
