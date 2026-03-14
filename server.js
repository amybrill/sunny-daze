const express = require('express');
const cors = require('cors');
const path = require('path');
const { createCheckoutSession } = require('./stripe-logic.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName, couponCode } = req.body;
    try {
        const session = await createCheckoutSession(priceId, userEmail, userName, serviceName, couponCode);
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
