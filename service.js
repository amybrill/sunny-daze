const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const path = require('path');
const app = express();

// This allows the server to read your HTML files from the public folder
app.use(express.static('public'));
app.use(express.json());

// This is the bridge that sends the birth info to Stripe
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, name, customerName, birthdate, email, birthplace, birthtime } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
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
            // THIS SAVES ALL THE DATA IN YOUR STRIPE DASHBOARD
            metadata: {
                customer_name: customerName,
                birth_date: birthdate,
                service_type: name,
                email: email || 'N/A',
                birth_place: birthplace || 'N/A',
                birth_time: birthtime || 'N/A'
            },
            // success_url sends them back to the site to see their confirmation/numbers
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// The port Railway uses to keep the site alive
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze server running on port ${PORT}`));
