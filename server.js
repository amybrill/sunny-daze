import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Stripe with your Secret Key from Environment Variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// --- STRIPE ENDPOINT ---
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sunny Daze Fortune Cookie',
            },
            unit_amount: 100, // Price in cents ($1.00)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:3000'}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log('Server is running on port ' + PORT);
});
