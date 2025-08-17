import { create } from "zustand"
import axios from "../lib/axios.js"
import { toast } from "react-hot-toast"
import useCouponStore from "./useCouponStore.js"


const useCartStore = create((set, get) => ({
    cart: [],

    total: 0,
    subtotal: 0,
    savings: 0,

    getCartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({ cart: res.data });
            get().calculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    addToCart: async (product) => {


        try {
            await axios.post("/cart", { productId: product._id });


            set((previousState) => {


                const existingItem = previousState.cart.find((item) => item._id === product._id);
                let updatedCart;
                if (existingItem) {
                    console.log("existing")
                    updatedCart = previousState.cart.map((item) =>
                        (item._id === product._id) ?
                            { ...item, quantity: item.quantity + 1 } :
                            item)

                } else {

                    updatedCart = [...previousState.cart, { ...product, quantity: 1 }]
                }

                toast.success("Successfully Added to Cart")

                return { cart: updatedCart };

            })

            get().calculateTotals()
        } catch (error) {
            toast.error(
                error.response.data.error || "Failed to add product to cart"
            );
            console.error("CartStore add error:", error);
        }
    },
    calculateTotals: () => {
        const coupon = useCouponStore.getState().coupon
        const { cart } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        let total = subtotal;



        if (coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100)
            total = subtotal - discount;
        }
        const savings = total - subtotal
        set({ subtotal, total, savings });

    },

    updateCartQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().removeFromCart(productId)
            return;
        }
        try {
            await axios.put(`/cart/${productId}`, { quantity })

            set((previousState) => ({
                cart: previousState.cart.map((item) =>
                    (item._id === productId) ?
                        { ...item, quantity } :
                        item)
            }))
            get().calculateTotals()
        } catch (error) {
            console.log(error)
        }
    },
    removeFromCart: async (productId) => {
        await axios.delete("/cart", { data: { productId } })
        set((previousState) => ({
            cart: previousState.cart.filter((item) => (item._id !== productId))
        })

        )
        get().calculateTotals();
    },
    clearCart: async () => {
        try {
            const response = await axios.delete("/cart/clear")
            if (response.status === 200) set({ cart: [], coupon: null, total: 0, subtotal: 0, })
        } catch (error) {
            console.log("Error Clear Cart:", error)

        }




    }

}))

export default useCartStore