import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sunny Daze Lucky Numbers',
            description: 'Sunny will speak to the universe for you',
          },
          unit_amount: 99,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://' + req.headers.host}/?success=true`,
      cancel_url: `${req.headers.origin || 'https://' + req.headers.host}/?canceled=true`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get('/:any*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
