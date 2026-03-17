kconst express = require('express');
const app = express();
const path = require('path');
const stripe = require('stripe')('sk_live_51P6WvjFumfdhryie6v8W1vVlO8...'); // Your Live Key

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// STRIPE PRODUCT IDS (Preserved from your setup)
const STRIPE_IDS = {
    QUANTUM: 'price_1Su1cLFumfdhryie94Vy03', // $9.63
    SOUL: 'price_1Su1cLFumfdhryieQVyQn6hE'    // $2.22
};

// CREATE CHECKOUT SESSION
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, serviceName } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'cashapp', 'afterpay_clearpay', 'klarna'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            allow_promotion_codes: true, // Crucial for the 'destiny' code to work!
            
            // REDIRECT LOGIC:
            // If they bought the Soul/Life Path Reveal, send them to spirit-board.html
            // Otherwise, send them back to the main site with an 'unlocked' tag
            success_url: priceId === STRIPE_IDS.SOUL 
                ? `${req.headers.origin}/spirit-board.html?success=true` 
                : `${req.headers.origin}/index.html?unlocked=true`,
            
            cancel_url: `${req.headers.origin}/index.html`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Full logic active for Sunny Daze deployments.`);
});
