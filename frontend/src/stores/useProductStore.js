import { create } from "zustand"
import axios from "../lib/axios.js"
import { toast } from "react-hot-toast"


const useProductStore = create((set) => ({
    products: [],
    recommendedProducts: [],
    loading: false,



    createProduct: async (productData) => {
        set({ loading: true })
        try {
            const response = await axios.post("/products", productData)


            set((previousState) => ({
                products: [...previousState.products, response.data.product],
                loading: false
            }))
            toast.success("Successfully Created")


        } catch (error) {

            toast.error(error.response.data.error || "Internal Server Error")
            set({ loading: false })
            console.error("Create Product Store error:", error);
        }
    },

    getRecommendedProducts: async () => {
        try {

            const response = await axios.get("/products/recommendations")
            set({ recommendedProducts: response.data });




        } catch (error) {
            console.log("Error in Recommended Products:", error)
        }

    },

    fetchAllProducts: async () => {
        set({ loading: true })
        try {
            const response = await axios.get("/products");
            set({ products: response.data.products, loading: false })

        } catch (error) {
            set({ loading: false })
            toast.error("Failed fetching")
            console.error("Fetch All Products Store error:", error);

        }
    },

    fetchProductsByCategory: async (category) => {
        try {
            set({ loading: true });
            const response = await axios.get(`/products/category/${category}`);

            set({ products: response.data.products, loading: false })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error || "Failed to fetch Products")
            console.error("Fetch Products By Category Store error:", error);
        }
    },
    toggleFeaturedProduct: async (productID) => {
        set({ loading: true });
        try {

            const response = await axios.patch(`/products/${productID}`);

            if (response.data.isFeatured)
                toast.success("Product Featured")
            else
                toast.error("Product Unfeatured ")


            set((previousProduct) => ({
                products: previousProduct.products.map((product) =>
                    product._id === productID ?
                        { ...product, isFeatured: response.data.isFeatured }
                        : product),
                loading: false
            }))


        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.error || "Failed to Update Product");
            console.error("Toggle Feautured Product Error:", error);
        }
    },
    deleteProduct: async (productID) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productID}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productID),
                loading: false,
            }));
        } catch (error) {
            console.error("Delete Product Store error:", error);
        }

    },
    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            console.log("Error fetching featured products:", error);
        }
    },
}))



export default useProductStore 