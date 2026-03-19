require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    // 1. Get the data (Using 'userEmail' and 'serviceName' to match your HTML)
    const { 
        priceId, 
        userEmail, 
        serviceName,
        name, 
        dob, 
        city, 
        time,
        partner 
    } = req.body;

    // 2. Fixed the cut-off URL
    const clientUrl = process.env.CLIENT_URL || 'https://sunny-daze-production.up.railway.app';
    
    // 3. Dynamic Success Redirect
    let successUrl = `${clientUrl}/?success=true`; 

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail, 
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true, 
            success_url: successUrl,
            cancel_url: clientUrl,
            metadata: { 
                service: serviceName || "Numerology Reading",
                customer_name: name || "Not Provided",
                birth_date: dob || "Not Provided",
                birth_city: city || "Not Provided",
                birth_time: time || "Not Provided",
                partner_name: partner || "None"
            }
        });

        // Return the session ID
        res.json({ id: session.id });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Sunny Daze Server running on port ${PORT}`));
