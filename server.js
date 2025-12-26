const path = require('path');
const __dirname = path.resolve();
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log("Phone is requesting a checkout session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Your Custom Product' },
          unit_amount: 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://192.168.1.207:8081/success',
      cancel_url: 'http://192.168.1.207:8081/cancel',
    });
    console.log("Session created! Sending URL to phone...");
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

  console.log('✅ STRIPE SERVER READY ON 8081');
  console.log('Listening for your phone...');
});

app.get('/success', (req, res) => {
  res.send('<h1>Payment Successful!</h1><p>Thank you for your purchase.</p><a href="/">Go back home</a>');
});

app.get('/cancel', (req, res) => {
  res.send('<h1>Payment Cancelled</h1><p>Your items are still in your cart.</p><a href="/">Try again</a>');
});

app.get('/:any*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
