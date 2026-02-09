import express from 'express';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const stripe = new Stripe(process.env.STRIPE_KEY);

app.use(express.json());

// This tells the server to look specifically in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// This forces the homepage to load your index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: req.body.name },
                    unit_amount: req.body.amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/?type=${req.body.returnType}`,
            cancel_url: `${req.headers.origin}/`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Sunny Daze is live on port ${port}`);
});
