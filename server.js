kconst stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors'); // Added for better communication

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve the website at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;

    // Use the URL from the browser (clientUrl) or the Railway Environment variable
    // This ensures we ALWAYS have a valid https:// link for Stripe
    let domain = clientUrl || process.env.FRONTEND_URL || 'https://sunny-daze-production.up.railway.app';
    
    // Safety check: ensure domain starts with https
    if (!domain.startsWith('http')) {
        domain = `https://${domain}`;
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ 
                price: priceId, 
                quantity: 1 
            }],
            mode: 'payment',
            // If it's the Phase 2 unlock, add the 'unlocked=true' tag to the return link
            success_url: serviceName === 'Full Journey Access' 
                ? `${domain}?success=true&unlocked=true` 
                : `${domain}?success=true`,
            cancel_url: `${domain}?canceled=true`,
            metadata: { 
                item_name: serviceName, 
                user_email: userEmail 
            }
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Sunny Daze logic is running on port ${PORT}`));
