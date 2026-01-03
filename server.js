const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  const { type, name, dob } = req.body;

  let priceId = '';

  if (type === 'premium') {
    // Replace the ID below with your actual 4.44 Price ID from Stripe
    priceId = 'price_1SlNjUFumfdhryie12U9osUh'; 
  } else {
    // Replace the ID below with your actual 0.99 Price ID from Stripe
    priceId = 'price_1SkydkFumfdhryieQKJsRb6K';
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      metadata: { name, dob, type },
      success_url: `${process.env.YOUR_DOMAIN}/success?name=${encodeURIComponent(name)}&dob=${dob}`,
      cancel_url: `${process.env.YOUR_DOMAIN}/`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
