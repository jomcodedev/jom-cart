import Product from "../models/products.model.js"

import HttpError from "../errors/HttpError.js"

import redis from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"



const getFeaturedProducts = async () => {
    try {
        let featuredProducts = await redis.get("featured_products")

        if (featuredProducts) return JSON.parse(featuredProducts)


        featuredProducts = await Product.find({ isFeatured: true }).lean()

        if (!featuredProducts.length) {
            throw new HttpError("No featured products found", 404, "FeaturedProductsNotFound")
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts))
        return featuredProducts

    } catch (error) {
        throw error
    }
}

const createProduct = async ({ name, description, price, image, category }) => {
    try {
        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })

        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })

        return product
    } catch (error) {
        throw error

    }
}

const deleteProduct = async (productId) => {
    let product
    try {

        product = await Product.findById(productId)
        if (!product) throw HttpError("Product not found", 404)
    } catch (error) {
        throw error
    }

    if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];

        try {
            await cloudinary.uploader.destroy(`products/${publicId}`)
            console.log("Deleted image in cloudinary")
        } catch (error) {
            throw error

        }
    }
    try {
        await Product.findByIdAndDelete(productId)
    } catch (error) {
        throw error
    }
}
const updateFeauturedProductCache = async () => {
    try {

        const featuredProducts = await Product.find({ isFeatured: true }).lean()
        await redis.set("featured_products", JSON.stringify(featuredProducts))

    } catch (error) {
        throw error
    }

}
export {
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    updateFeauturedProductCache
}