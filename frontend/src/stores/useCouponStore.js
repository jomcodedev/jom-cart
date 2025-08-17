import { create } from "zustand"
import axios from "../lib/axios.js"
import useCartStore from "./useCartStore.js"
import toast from "react-hot-toast"

const useCouponStore = create((set, get) => ({
    coupon: null,
    isCouponApplied: false,

    getMyCoupon: async () => {
        try {
            const response = await axios.get("/coupons")

            set({ coupon: response.data })


        } catch (error) {
            console.log("Error fetching coupon:", error);
        }
    },
    applyCoupon: async (code) => {
        try {
            const response = await axios.post("/coupons/validate", { code })
            if (response.status === 200) {
                set({ coupon: response.data, isCouponApplied: true })
                const calculateTotals = useCartStore.getState().calculateTotals
                calculateTotals()

                toast.success("Coupon Applied Successfully")
            }

        } catch (error) {
            console.log("Error in Applying Coupon:", error)

        }
    },
    removeCoupon: () => {
        set({ coupon: null, isCouponApplied: false });
        toast.success("Coupon Removed")
        const calculateTotals = useCartStore.getState().calculateTotals
        calculateTotals()

    }
}))



export default useCouponStore