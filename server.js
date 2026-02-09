import Stripe from 'stripe';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe('sk_live_1SyglbFumfdhryieh9ztni0J');
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Main checkout session logic
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, itemName } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { 
                        name: itemName 
                    },
                    unit_amount: Math.round(amount * 100), 
                },
                quantity: 1,
            }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`  SUNNY DAZE IS SECURE AND RUNNING         `);
    console.log(`-------------------------------------------`);
});

