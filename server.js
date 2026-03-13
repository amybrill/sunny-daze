const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    // We pull every possible name variation just in case
    const { priceId, userEmail, userName, name, serviceName, clientUrl, couponCode } = req.body;

    try {
        let successUrl = `${clientUrl}/confirmation.html`; 
        
        if (serviceName.includes('Soul Urge')) {
            successUrl = `${clientUrl}/spirit-board.html`; 
        } else if (serviceName.includes('Lucky Number')) {
            successUrl = `${clientUrl}/lucky-picks.html`; 
        } else if (serviceName.includes('Quantum')) {
            successUrl = `${clientUrl}/index.html?unlocked=true`; 
        }

        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            return res.json({ url: successUrl });
        }

        // --- THE SAFETY NET ---
        // This picks whichever name actually has text, or uses "Valued Customer" if both are empty.
        const finalName = (userName || name || "Valued Customer").trim();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: clientUrl,
            // We tell Stripe to use the finalName we created
            metadata: { 
                serviceName: serviceName,
                customerEmail: userEmail || "No Email Provided",
                customerName: finalName 
            }
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: "Checkout error. Please ensure all fields are filled." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
