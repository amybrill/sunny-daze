const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Serve the website at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;
    
    // Auto-detect domain or fallback to your Railway URL
    let domain = clientUrl || 'https://sunny-daze-production.up.railway.app';
    if (!domain.startsWith('http')) domain = `https://${domain}`;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: serviceName === 'Full Journey Access' 
                ? `${domain}?success=true&unlocked=true` 
                : `${domain}?success=true`,
            cancel_url: `${domain}?canceled=true`,
            metadata: { item_name: serviceName, user_email: userEmail }
        });
        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Sunny Daze logic running on ${PORT}`));
