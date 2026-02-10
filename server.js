import express from 'express';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// UPDATED TO MATCH YOUR RAILWAY VARIABLE: STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, name, customerName, birthdate } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { 
                        name: name,
                        description: `Destiny Reading for ${customerName}`,
                    },
                    unit_amount: amount, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/?type=spirit-board`,
            cancel_url: `${req.headers.origin}/`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Sunny Daze is live on port ${port}`);
});
