const express = require('express');
const app = express();
const path = require('path');
// Replace the XXX with your actual sk_live key inside the quotes
const stripe = require('stripe')('sk_live_51P6WvjFumfdhryie6v8W1vVlO8...'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const STRIPE_IDS = {
    QUANTUM: 'price_1Su1cLFumfdhryie94Vy03', 
    SOUL: 'price_1Su1cLFumfdhryieQVyQn6hE'    
};

app.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'cashapp', 'afterpay_clearpay', 'klarna'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: `${req.headers.origin}/index.html?success=true&type=${priceId === STRIPE_IDS.SOUL ? 'soul' : 'quantum'}`,
            cancel_url: `${req.headers.origin}/index.html`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
