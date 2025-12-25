import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
import cors from 'cors';
app.use(cors({ origin: 'https://sunny-daze-production.up.railway.app' }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sunny Daze Premium' },
          unit_amount: 99,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://your-new-railway-url-here.up.railway.app/success',
      cancel_url: 'https://your-new-railway-url-here.up.railway.app/',
    });
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get(/^\/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT));
// Railway Update Dec 25
