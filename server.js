import Stripe from 'stripe';
import express from 'express';
import cors from 'cors';

const stripe = new Stripe('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');
const app = express();

app.use(express.static('.'));
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `Sunnydaze Magic: ${req.body.game} Numbers`,
            description: 'Your personalized lucky numbers revealed by Sunny.',
          },
          unit_amount: 99,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://tawanna-semiperceptive-gloria.ngrok-free.dev/success',
      cancel_url: 'https://tawanna-semiperceptive-gloria.ngrok-free.dev/',
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(4242, () => console.log('🚀 LIVE Server Active on http://localhost:4242'));
