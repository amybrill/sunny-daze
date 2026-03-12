const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// STEP 1: Serve all static files (images, html, css) from the main folder
app.use(express.static(__dirname));

// STEP 2: Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl } = req.body;

    try {
        // Default success path (for email-based readings like Trinity/Compatibility)
        let successUrl = `${clientUrl}/confirmation.html`; 
        
        // Logic for instant-access content
        // Since spirit-board.html and lucky-picks.html are missing, 
        // we redirect them back to the main index.html with instructions.
        if (serviceName.includes('Soul Urge') || serviceName.includes('Quantum')) {
            // This triggers the "Unlock" logic in index.html for Phase 2 & 3
            successUrl = `${clientUrl}/index.html?unlocked=true`; 
        } else if (serviceName.includes('Lucky Number')) {
            // This will tell index.html to show the lottery section
            successUrl = `${clientUrl}/index.html?lottery=true`;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: clientUrl,
            metadata: { 
                serviceName: serviceName,
                customerEmail: userEmail 
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// STEP 3: Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// STEP 4: Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
