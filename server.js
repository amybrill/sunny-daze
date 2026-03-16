require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;
    
    // Success Redirect Logic
    let successUrl = `${clientUrl}/confirmation.html`; 
    
    if (serviceName.includes('Soul Urge')) {
        successUrl = `${clientUrl}/spirit-board.html`; 
    } else if (serviceName.includes('Lucky Number')) {
        successUrl = `${clientUrl}/lucky-picks.html`;
    } else if (serviceName.includes('Timeline')) {
        successUrl = `${clientUrl}/timeline-results.html`;
    } else if (serviceName.includes('Compatibility')) {
        successUrl = `${clientUrl}/compatibility-results.html`;
    } else if (serviceName.includes('Cosmic Trinity')) {
        successUrl = `${clientUrl}/trinity-reveal.html`;
    } else if (serviceName.includes('Quantum Pulse')) {
        successUrl = `${clientUrl}?unlocked=true`;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ 
                price: priceId, 
                quantity: 1 
            }],
            mode: 'payment',
            
            // This line allows your 'destiny' coupon code to be used at checkout
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
        console.error("Stripe Session Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunny Daze Server is running on port ${PORT}`);
});
