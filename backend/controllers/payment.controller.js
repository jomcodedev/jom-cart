import { createCheckoutSession, checkoutSuccess } from "../services/payment.service.js";

const createCheckoutSessionController = async (req, res) => {
    const { products, couponCode } = req.body;
    const userId = req.user._id
    if (!Array.isArray(products) || products.length === 0)
        return res.status(400).json({ error: "Invalid or empty products array" })
    try {
        const checkoutSessionData = await createCheckoutSession({ products, couponCode, userId });


        res.status(200).json({
            checkoutSessionData
        });
    } catch (error) {
        console.log("Error in createCheckoutSessionController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}


const checkoutSuccessController = async (req, res) => {

    const { sessionId } = req.body

    try {
        const orderID = await checkoutSuccess(sessionId);
        res.status(200).json({
            success: true,
            message: "Payment successful, order created, and coupon deactivated if used.",
            orderId: orderID
        });
    } catch (error) {
        console.log("Error in checkoutSuccessController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}

export { createCheckoutSessionController, checkoutSuccessController }