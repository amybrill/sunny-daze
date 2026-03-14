const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(priceId, userEmail, userName, serviceName, couponCode) {
    const successUrl = `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`;
    
    const sessionOptions = {
        customer_email: userEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: `https://sunny-daze-production.up.railway.app/`,
        allow_promotion_codes: true 
    };

    try {
        // Direct link: If they type COSMIC, use the internal Stripe ID c2OMHTJ7
        if (couponCode && couponCode.trim().toUpperCase() === "COSMIC") {
            sessionOptions.discounts = [{ coupon: 'c2OMHTJ7' }];
        }

        return await stripe.checkout.sessions.create(sessionOptions);
    } catch (e) {
        console.error("Stripe Error:", e.message);
        // Fallback so buttons never 'freeze'
        delete sessionOptions.discounts;
        return await stripe.checkout.sessions.create(sessionOptions);
    }
}

module.exports = { createCheckoutSession };
