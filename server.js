const express = require('express');
const path = require('path');
// Added apiVersion to prevent the 400 error
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', 
});
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sunny Daze Lucky Numbers',
              description: 'Sunny will speak to the universe for you',
            },
            unit_amount: 99, // 0.99 cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // We use a hardcoded fallback if origin is missing
      success_url: `${req.headers.origin || 'https://' + req.headers.host}/?success=true`,
      cancel_url: `${req.headers.origin || 'https://' + req.headers.host}/?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe caught error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get('/:any*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
