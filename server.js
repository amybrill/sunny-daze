import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

app.use(cors());
app.use(express.json());

// Create dist folder if it doesn't exist to prevent crash
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

app.use(express.static(distPath));

app.post('/create-checkout-session', async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe Key Missing' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sunny Daze Product' },
          unit_amount: 99,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('Site is building, please refresh in 30 seconds...');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log('Server live on port ' + PORT));
