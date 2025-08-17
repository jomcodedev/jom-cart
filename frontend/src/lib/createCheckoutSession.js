import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios.js";
import useCartStore from "../stores/useCartStore.js";
import useCouponStore from "../stores/useCouponStore.js";


const createCheckout = async () => {
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(stripeKey);

    const coupon = useCouponStore.getState().coupon
    const cart = useCartStore.getState().cart;

    try {

        const stripe = await stripePromise;
        const res = await axios.post("payments/checkout/session", {
            products: cart,
            couponCode: coupon ? coupon.code : null,
        });
        const { checkoutSessionData } = res.data;

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSessionData.sessionId,
        });
        console.log("RESULT: ", result);
        console.log("Session: ", session);
    } catch (error) {
        console.log("Error in Checkout Session:", error)
    }
}

export default createCheckout