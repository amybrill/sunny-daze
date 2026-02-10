const express = require('express');
const path = require('path');
const app = express();

// Load Stripe only if the key exists to prevent immediate crashing
const stripe = process.env.STRIPE_KEY ? require('stripe')(process.env.STRIPE_KEY) : null;

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        if (!stripe) {
            throw new Error("STRIPE_KEY is missing in Railway Variables");
        }

        const { amount, name, customerName, birthdate, email, birthplace, birthtime } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            allow_promotion_codes: true,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { 
                        name: name,
                        description: `Reading for ${customerName}`
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            metadata: {
                customer_name: customerName,
                birth_date: birthdate,
                service_type: name,
                email: email || 'N/A',
                birth_place: birthplace || 'N/A',
                birth_time: birthtime || 'N/A'
            },
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Sunny Daze server running on port ${PORT}`);
    if (!process.env.STRIPE_KEY) {
        console.log("WARNING: STRIPE_KEY is not defined in Railway Variables!");
    }
});
