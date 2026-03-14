const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName, couponCode } = req.body;
    try {
        const sessionOptions = {
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`,
            cancel_url: `https://sunny-daze-production.up.railway.app/`,
            
            /* THIS LINE ADDS THE COUPON BOX TO THE STRIPE PAYMENT PAGE */
            allow_promotion_codes: true 
        };

        // If they typed 'COSMIC' on your site, this pre-applies it for them
        if (couponCode && couponCode.trim() !== "") {
            sessionOptions.discounts = [{ coupon: couponCode.trim() }];
        }

        const session = await stripe.checkout.sessions.create(sessionOptions);
        res.json({ url: session.url });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`);
});
