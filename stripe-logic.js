const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(priceId, userEmail, userName, serviceName, couponCode) {
    const successUrl = `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`;
    const cancelUrl = `https://sunny-daze-production.up.railway.app/`;

    const sessionOptions = {
        customer_email: userEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        allow_promotion_codes: true
    };

    try {
        // If 'COSMIC' was typed, try to find the matching Promo Code ID
        if (couponCode && couponCode.trim() !== "") {
            const promoCodes = await stripe.promotionCodes.list({
                code: couponCode.trim().toUpperCase(),
                active: true,
                limit: 1
            });

            if (promoCodes.data.length > 0) {
                sessionOptions.discounts = [{ promotion_code: promoCodes.data[0].id }];
            }
        }

        return await stripe.checkout.sessions.create(sessionOptions);
    } catch (e) {
        console.error("Stripe Logic Error:", e.message);
        // Fallback: Create session without the discount so the user can still pay
        delete sessionOptions.discounts;
        return await stripe.checkout.sessions.create(sessionOptions);
    }
}

module.exports = { createCheckoutSession };
