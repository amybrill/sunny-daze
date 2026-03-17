const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

// This map connects your product names to your working Payment Links
const PAYMENT_LINKS = {
    "Lucky Number Generator": "https://buy.stripe.com/00wdR9b7QboS7slcV94Vy08",
    "Soul Urge and Life Path Reveal Reading": "https://buy.stripe.com/bJe3cvdfYgJcfYR6wL4Vy07",
    "Timeline Transit Number Reading": "https://buy.stripe.com/28EbJ10tceB43c53kzVy06",
    "Cosmic Trinity": "https://buy.stripe.com/00wfZh7VEcsW281dZd4Vy05",
    "Cosmic compatibility": "https://buy.stripe.com/9B65kDdfYgJcaEx9IX4Vy04",
    "Quantum Pulse Shifting": "https://buy.stripe.com/00w5kDcbU64yh2VcV94Vy03"
};

app.post('/create-checkout-session', async (req, res) => {
    const { item } = req.body;
    
    // Look up the link based on the name sent by the button
    const link = PAYMENT_LINKS[item];

    if (link) {
        // Send the working link back to your website
        res.json({ url: link });
    } else {
        res.status(404).json({ error: "Product link not found" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
