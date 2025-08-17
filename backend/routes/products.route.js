import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

import {
    getAllProductsController,
    getFeaturedProductsController,
    createProductController,
    deleteProductController,
    productRecommendationController,
    getProductsByCategoryController,
    toggleFeaturedProductController
} from "../controllers/product.controller.js";



const productsRouter = Router()

productsRouter.get("/", protectRoute, adminRoute, getAllProductsController)
productsRouter.post("/", protectRoute, adminRoute, createProductController)
productsRouter.delete("/:id", protectRoute, adminRoute, deleteProductController)

productsRouter.patch("/:id", protectRoute, adminRoute, toggleFeaturedProductController)

productsRouter.get("/featured", getFeaturedProductsController)
productsRouter.get("/recommendations", productRecommendationController)
productsRouter.get("/category/:category", getProductsByCategoryController)


export default productsRouter