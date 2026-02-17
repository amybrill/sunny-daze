const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

// --- TRAFFIC MONITOR ---
// This block logs a message every time someone loads your homepage
app.use((req, res, next) => {
    if (req.path === '/' || req.path.includes('.html')) {
        console.log(`👀 TRAFFIC: Someone just landed on your site! (${new Date().toLocaleTimeString()})`);
    }
    next();
});

app.use(express.static('public'));
app.use(express.json());

// --- CHECKOUT LOGIC ---
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, name, customerName, birthdate, email, birthplace, birthtime } = req.body;
        
        // This prints the moment they click a buy button
        console.log(`🚀 CHECKOUT STARTED: ${customerName} is looking at the ${name} ($${amount/100})`);

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

        // This confirms the hand-off to Stripe was successful
        console.log(`✅ LINK READY: Sent ${customerName} to Stripe.`);
        res.json({ url: session.url });
    } catch (error) {
        console.error("❌ STRIPE ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`SUNNY DAZE LIVE ON PORT ${PORT}`);
    console.log(`Monitoring visits and checkouts...`);
    console.log(`-----------------------------------------`);
});
