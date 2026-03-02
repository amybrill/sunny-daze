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
        // We pull all variables from the HTML form, including the new partnerName
        const { 
            amount, 
            name, 
            customerName, 
            email, 
            birthdate, 
            birthplace, 
            birthtime,
            partnerName 
        } = req.body;
        
        console.log(`🚀 CHECKOUT: ${customerName} is purchasing ${name}`);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            allow_promotion_codes: true,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { 
                        name: name,
                        description: `Personalized Reading for ${customerName}`
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            // THIS IS WHERE YOUR DATA IS SAVED FOR YOU TO READ LATER
            metadata: {
                customer_name: customerName,
                customer_email: email || 'N/A',
                partner_of_interest: partnerName || 'N/A', 
                birth_date: birthdate,
                birth_place: birthplace || 'N/A',
                birth_time: birthtime || 'N/A',
                service_type: name
            },
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
        });

        console.log(`✅ STRIPE LINK CREATED: Metadata includes partner: ${partnerName || 'None'}`);
        res.json({ url: session.url });
    } catch (error) {
        console.error("❌ STRIPE ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`SUNNY DAZE SERVER LIVE ON PORT ${PORT}`);
    console.log(`Ready for readings and compatibility checks!`);
    console.log(`-----------------------------------------`);
});
