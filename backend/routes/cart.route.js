import { Router } from "express"
import {
    addToCartController,
    getCartProductsController,
    removeItemFromCartController,
    updateCartQuantityController,
    clearCartController
} from "../controllers/cart.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const cartRouter = Router()

cartRouter.get("/", protectRoute, getCartProductsController)
cartRouter.post("/", protectRoute, addToCartController)
cartRouter.delete("/", protectRoute, removeItemFromCartController)
cartRouter.delete("/clear", protectRoute, clearCartController)
cartRouter.put("/:id", protectRoute, updateCartQuantityController)

export default cartRouter