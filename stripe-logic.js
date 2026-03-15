const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(priceId, userEmail, userName, serviceName, couponCode) {
    const successUrl = `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`;
    
    // Start with the basic options
    const sessionOptions = {
        customer_email: userEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: `https://sunny-daze-production.up.railway.app/`
    };

    const checkCode = couponCode ? couponCode.trim().toUpperCase() : "";

    // IMPORTANT: Stripe rules say you usually can't have BOTH 'discounts' 
    // and 'allow_promotion_codes' in the same request.
    if (checkCode === "COSMIC") {
        // Option A: Pre-apply the 100% off coupon directly
        sessionOptions.discounts = [{ coupon: 'c2OMHTJ7' }];
    } else {
        // Option B: No code typed yet, so just show the "Add Promotion Code" box
        sessionOptions.allow_promotion_codes = true;
    }

    try {
        return await stripe.checkout.sessions.create(sessionOptions);
    } catch (e) {
        console.error("Stripe Session Error:", e.message);
        // Fallback: If anything fails, send them to a standard checkout with the promo box enabled
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
