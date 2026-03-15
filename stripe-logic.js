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
        const inputCode = couponCode ? couponCode.trim().toUpperCase() : "";

        if (inputCode === "COSMIC") {
            // We apply the coupon ID directly as a fallback
            sessionOptions.discounts = [{ coupon: 'c2OMHTJ7' }];
        }

        return await stripe.checkout.sessions.create(sessionOptions);
    } catch (e) {
        console.error("Stripe Error:", e.message);
        // Fallback: If the discount fails, still let the user go to checkout
        return await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: `https://sunny-daze-production.up.railway.app/`,
            allow_promotion_codes: true 
        });
    }
}

module.exports = { createCheckoutSession };
