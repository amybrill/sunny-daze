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
          product_data: { name: 'Sunny Daze Premium' },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      // Added absolute URLs to ensure Stripe knows where to return
      success_url: 'https://sunny-daze-charm.onrender.com/success',
      cancel_url: 'https://sunny-daze-charm.onrender.com/',
    });
    
    // We send back BOTH the ID and the URL just in case
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
app.listen(PORT, () => console.log('Server running on port ' + PORT));
