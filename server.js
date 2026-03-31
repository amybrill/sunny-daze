
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    // 1. Extract EVERYTHING the HTML is sending in the body
    const { 
        priceId, 
        userEmail, 
        serviceName,
        name,
        dob,
        city,
        time,partner 
    } = req.body;

    // --- PASTE STARTS HERE ---
    // Use the base URL from your Railway variables
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:8080';
    
    // Set the specific destinations
    const successUrl = `${baseUrl}/success?success=true`; 
    const cancelUrl = `${baseUrl}/`; 
    // --- PASTE ENDS HERE ---

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail, 
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true, 
            customer_creation: 'always',
            success_url: successUrl, // This now uses our new variable
            cancel_url: cancelUrl,   // This now uses our new variable
            metadata: {
                seeker_name: name || 'Not provided',
                birth_date: dob || 'Not provided',
                birth_location: city || 'Not provided',
                birth_time: time || 'Not provided',
                partner_info: partner || 'None',
                service: serviceName || 'General Reading'
            }
        });

        // Send both ID and URL back to the frontend
        res.json({ id: session.id, url: session.url });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Sunny Daze Server running on port ${PORT}`));

