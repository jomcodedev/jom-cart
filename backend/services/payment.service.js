import stripe from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js"

const CURRENCY = process.env.CURRENCY || "sgd";
const MINIMUM_REWARD_AMOUNT_CENTS = 200 * 100; // 200 sgd in cents
const CLIENT_URL = process.env.CLIENT_URL;


async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({ userId })
    let code;
    let isCouponCodeTaken = true;
    while (isCouponCodeTaken) {
        code = "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase();
        isCouponCodeTaken = await Coupon.exists({ code });
    }

    const newCoupon = new Coupon({
        code,
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId
    });

    await newCoupon.save();
    return newCoupon;
}
async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });
    return coupon.id;
}

const createCheckoutSession = async ({ products, couponCode, userId }) => {
    try {
        if (!products || !products.length) {
            throw new Error("No products provided for checkout.");
        }


        const lineItems = products.map(product => ({
            price_data: {
                currency: CURRENCY,
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity || 1,
        }));


        const totalAmount = lineItems.reduce(
            (sum, item) => sum + item.price_data.unit_amount * item.quantity,
            0
        );

        let coupon = null;
        let stripeCouponId = null;

        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId, isActive: true });
            if (!coupon) {
                throw new Error("Invalid or inactive coupon code.");
            }


            if (!coupon.stripeCouponId) {
                coupon.stripeCouponId = await createStripeCoupon(coupon.discountPercentage);
                await coupon.save();
            }
            stripeCouponId = coupon.stripeCouponId;
        }


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${CLIENT_URL}/checkout/cancelled`,
            discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
            metadata: {
                userId: userId.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(products.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })))
            },
        });


        if (totalAmount >= MINIMUM_REWARD_AMOUNT_CENTS) {
            await createNewCoupon(userId);
        }

        return {
            sessionId: session.id,
            totalAmount: totalAmount / 100,



        };
    } catch (error) {
        console.error(`Checkout session creation failed for user ${userId}, coupon: ${couponCode}`, error);
        throw error;
    }
};



const checkoutSuccess = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {



            const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
            if (existingOrder) {
                console.log("Order already exists for session:", sessionId);
                return {
                    success: true,
                    message: "Order already created.",
                    orderId: existingOrder._id,
                };
            }
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId,
                    },
                    {
                        isActive: false,
                    }
                );
            }


            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map((product) => ({
                    product: product.product,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
            });

            await newOrder.save();

            return {
                success: true,
                message: "Payment successful, order created, and coupon deactivated if used.",
                orderId: newOrder._id,
            };
        }
    } catch (error) {
        console.error("Error processing successful checkout:", error);
        throw error
    }
}

export { createCheckoutSession, checkoutSuccess }