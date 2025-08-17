import Coupon from "../models/coupon.model.js"

const getCouponController = async (req, res) => {
    const userId = req.user._id
    try {
        const coupon = await Coupon.findOne({ userId, isActive: true })
        res.json(coupon || null)
    } catch (error) {
        console.log("Error in getCouponController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }

}


const validateCouponController = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user._id
        const coupon = await Coupon.findOne({ code: code, userId: userId, isActive: true })

        if (!coupon) return res.status(404).json({ message: "Coupon Not Found" })


        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ message: "Coupon Expired" })
        }


        res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log("Error in validateCouponController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}
export { getCouponController, validateCouponController }