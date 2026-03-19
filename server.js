require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    // 1. Get ALL the data from your new HTML inputs
    const { 
        priceId, 
        email, 
        name, 
        dob, 
        city, 
        time, 
        partner, 
        serviceName 
    } = req.body;

    const clientUrl = process.env.CLIENT_URL || 'https://your-site-name.up.railway.app';
    
    // 2. Dynamic Success Redirects
    let successUrl = `${clientUrl}/?success=true`; 

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email, // Auto-fills email on Stripe page
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true, 
            success_url: successUrl,
            cancel_url: clientUrl,
            // 3. THIS IS THE KEY: Sending the data to your Stripe Dashboard
            metadata: { 
                service: serviceName || "Numerology Reading",
                customer_name: name,
                birth_date: dob,
                birth_city: city,
                birth_time: time,
                partner_name: partner || "None"
            }
        });
        
        // Return the session ID to the frontend
        res.json({ id: session.id });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Sunny Daze Server running on port ${PORT}`));
