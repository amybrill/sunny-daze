const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName, clientUrl, couponCode } = req.body;

    try {
        // 1. Clean up the URL to prevent double slashes
        const baseUrl = clientUrl.replace(/\/$/, "");
        
        // 2. Set the default fallback success page
        let successUrl = `${baseUrl}/confirmation.html`;

        // 3. Conditional Logic: Redirect to Powerball/Spirit Board only if files exist
        if (serviceName && serviceName.includes('Soul Urge')) {
            if (fs.existsSync(path.join(__dirname, 'spirit-board.html'))) {
                successUrl = `${baseUrl}/spirit-board.html`;
            }
        } else if (serviceName && (serviceName.includes('Lucky Number') || serviceName.includes('Lottery'))) {
            if (fs.existsSync(path.join(__dirname, 'Lucky-picks.html'))) {
                successUrl = `${baseUrl}/Lucky-picks.html`;
            }
        } else if (serviceName && serviceName.includes('Quantum')) {
            successUrl = `${baseUrl}/index.html?unlocked=true`;
        }

        // Coupon shortcut logic (skips Stripe)
        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            return res.json({ url: successUrl });
        }

        // 4. Sanitize inputs to prevent "Empty String" errors.
        // If a value is empty or just whitespace, we set it to 'undefined'.
        // Stripe's library will remove 'undefined' keys from the request, preventing the crash.
        const cleanName = (userName && userName.trim() !== "") ? userName.trim() : undefined;
        const cleanEmail = (userEmail && userEmail.trim() !== "") ? userEmail.trim() : undefined;

        // 5. Build the Stripe Session Options
        const sessionOptions = {
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: baseUrl,
            // Metadata is for your internal logs in the Stripe Dashboard
            metadata: { 
                buyer_name: cleanName || "Guest",
                buyer_email: cleanEmail || "No Email Provided",
                service: serviceName || "General Service"
            }
        };

        // ONLY attach customer_email if it's not undefined.
        // This is where your previous error "customer_data[name] cannot be unset" was coming from.
        if (cleanEmail) {
            sessionOptions.customer_email = cleanEmail;
        }

        const session = await stripe.checkout.sessions.create(sessionOptions);

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error Details:", error);
        res.status(500).json({ error: "Checkout error. Please ensure your inputs are correct." });
    }
});

// Primary route for index
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html')); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); 
});
