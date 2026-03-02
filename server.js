const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

// --- TRAFFIC MONITOR ---
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
        // We ensure these variables match the 'fetch' call in your index.html
        const { 
            amount, 
            name, 
            customerName, 
            birthdate, 
            email, 
            birthplace, 
            birthtime 
        } = req.body;
        
        console.log(`🚀 CHECKOUT STARTED: ${customerName} (${email}) is looking at ${name}`);

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
            // THIS BLOCK SAVES THE INFO TO YOUR STRIPE DASHBOARD
            metadata: {
                customer_name: customerName,
                customer_email: email || 'N/A',
                birth_date: birthdate,
                birth_place: birthplace || 'N/A',
                birth_time: birthtime || 'N/A',
                service_type: name
            },
            // The success URL now includes 'type' to help your HTML display the right board
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
        });

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
