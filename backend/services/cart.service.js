import HttpError from "../errors/HttpError.js";
import Product from "../models/products.model.js"

const addToCart = async ({ productId, user }) => {
    try {
        const existingItem = user.cartItems.find(item => item.id === productId);
        if (existingItem) {

            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
        }

        await user.save();
        return user.cartItems;
    } catch (error) {
        console.log("Error in addToCart Service")
        throw error;
    }
}
const removeItemFromCart = async (productId, user) => {
    try {
        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }
        await user.save();
        return (user.cartItems);
    } catch (error) {
        console.log("Error in removeAllFromCart Service");
        throw error;
    }
}

const getCartProducts = async (userCartItems) => {
    try {
        const products = await Product.find({ _id: { $in: userCartItems } })
        const cartItems = products.map(product => {
            const item = userCartItems.find(cartItem => cartItem.id === product.id)
            return { ...product.toJSON(), quantity: item.quantity }
        })


        return cartItems
    } catch (error) {
        console.log("Error in getCartProducts Service")
        throw error
    }




}


const updateCartQuantity = async (productId, user, quantity) => {
    try {


        const existingItem = user.cartItems.find((item) => item.id === productId);
        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                const result = await user.save();

                return user.cartItems;

            }
            existingItem.quantity = quantity;
            await user.save();

            return user.cartItems;

        } else {

            throw HttpError("Item not Found", 404)

        }
    } catch (error) {
        throw error
    }

}
export {
    addToCart,
    removeItemFromCart,
    getCartProducts,
    updateCartQuantity
}