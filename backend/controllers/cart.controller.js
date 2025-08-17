import User from "../models/user.model.js";
import { addToCart, getCartProducts, removeItemFromCart, updateCartQuantity } from "../services/cart.service.js"

const addToCartController = async (req, res) => {


    try {

        const { productId } = req.body;

        const user = req.user;

        if (!productId) return res.status(401).json({ message: "Product Id is missing" });
        if (!user) return res.status(401).json({ message: "Access Denied: Unauthorized access" });

        const cartItems = await addToCart({ productId, user })
        res.json(cartItems)
    } catch (error) {
        console.log("Error in addToCartController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }

}



const removeItemFromCartController = async (req, res) => {
    try {

        const { productId } = req.body;
        const user = req.user;
        const cartItems = await removeItemFromCart(productId, user)
        res.json(cartItems)
    } catch (error) {
        console.log("Error in removeAllFromCartController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}
const clearCartController = async (req, res) => {
    try {


        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, { $set: { cartItems: [] } })
        res.status(200).json("Cleared Successfully");
    } catch (error) {
        console.log("Error in clearCartController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}

const getCartProductsController = async (req, res) => {
    try {
        const userCartItems = req.user.cartItems


        const cartItems = await getCartProducts(userCartItems)

        res.json(cartItems)
    } catch (error) {
        console.log("Error in getCartFromCartController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}
const updateCartQuantityController = async (req, res) => {
    try {
        const { id: productId } = req.params
        const { quantity } = req.body
        const user = req.user

        const cartItems = await updateCartQuantity(productId, user, quantity)

        res.json(cartItems)
    } catch (error) {
        console.log("Error in updateCartQuantityController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })

    }
}



export {
    addToCartController,
    removeItemFromCartController,
    getCartProductsController,
    updateCartQuantityController,
    clearCartController
}