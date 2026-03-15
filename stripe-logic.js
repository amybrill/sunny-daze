const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(priceId, userEmail, userName, serviceName, couponCode) {
    const successUrl = `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`;
    
    try {
        // This is the most reliable way: Just open the checkout with the promo box enabled.
        // The user can type 'COSMIC' directly on the Stripe page.
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: `https://sunny-daze-production.up.railway.app/`,
            allow_promotion_codes: true // This activates the "Add Promotion Code" link
        });

        return session;
    } catch (e) {
        console.error("Stripe Error:", e.message);
        throw e;
    }
}

module.exports = { createCheckoutSession };
