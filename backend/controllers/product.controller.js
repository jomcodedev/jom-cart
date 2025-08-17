import Product from "../models/products.model.js"
import {
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    updateFeauturedProductCache,
} from "../services/product.service.js"


const getAllProductsController = async (req, res) => {
    try {

        const products = await Product.find({})
        res.json({ products })

    } catch (error) {

        console.log("Error in getAllProducts controller", error.message)
        res.status(500).json({ message: "Server Error", message: error.message })
    }
}

const getFeaturedProductsController = async (req, res) => {
    try {
        const featuredProducts = await getFeaturedProducts()
        if (featuredProducts) res.json(featuredProducts)
    } catch (error) {
        console.log("Error in getFeauturedProductsController:\n" + error)
        if (error.code === "FeaturedProductsNotFound") {
            return res.status(404).json({ message: error.message })
        }

        res.status(500).json({ message: "Server Error", error: error.message })

    }
}

const createProductController = async (req, res) => {
    try {
        const product = await createProduct(req.body)
        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }

}

const deleteProductController = async (req, res) => {
    try {
        await deleteProduct(req.params.id)
        res.status(201).json({ message: "Product Successfully Deleted" })
    } catch (error) {
        console.log("Error in Product Controller: \n" + error)
        res.status(error.status || 500).json({ message: error.message })
    }
}

const productRecommendationController = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            }, {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log("Error in Product Recommendation Controller: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}

const getProductsByCategoryController = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in Product Category Controller: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })

    }
}

const toggleFeaturedProductController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updateProduct = await product.save()
            await updateFeauturedProductCache();
            res.json(updateProduct)
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProductController: \n" + error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}

export {
    getAllProductsController,
    getFeaturedProductsController,
    createProductController,
    deleteProductController,
    productRecommendationController,
    getProductsByCategoryController,
    toggleFeaturedProductController
}