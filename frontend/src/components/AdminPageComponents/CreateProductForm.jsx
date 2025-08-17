import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { Input, Select, TextArea } from "../FormElements.jsx";
import useProductStore from "../../stores/useProductStore.js";
import toast from "react-hot-toast";

const categories = [
  "bags",
  "cameras",
  "headphones",
  "shades",
  "shoes",
  "tumblers",
  "watches",
];

const mappedCategories = {
  bag: "bag.jpg",
  camera: "camera.jpg",
  headphone: "headphone.jpg",
  shade: "shade.jpg",
  shoe: "shoe.jpg",
  tumbler: "tumbler.jpg",
  watch: "watch.jpg",
};

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { createProduct, loading } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.category) {
      toast.error("Select a category first");
      document.getElementById("categories").style.backgroundColor = "#FFC0CB";
      return;
    }
    try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSizeMb = 5;
    if (file) {
      const fileSizeMb = file.size / (1024 * 1024);
      if (fileSizeMb > maxSizeMb) {
        toast.error(
          "The selected image is too large. Please upload an image smaller than [size limit, e.g. 5MB]"
        );
        e.target.value = null;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct({ ...newProduct, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleImagePreviewSource =
    newProduct.image ||
    mappedCategories[newProduct.category?.toLowerCase()] ||
    "noPhotoSelected.jpg";

  return (
    <motion.div
      className="bg-card-primary shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl flex font-semibold mb-6 text-primary justify-center">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={handleImagePreviewSource}
              alt="Product Preview"
              className={`w-48 h-48 m-3 object-cover rounded-full shadow-sm  ${
                newProduct.image
                  ? "border-3  border-emerald-500"
                  : "border-3 border-red-500"
              }`}
            />
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {newProduct.image && (
              <span className="text-primary">Photo Uploaded</span>
            )}
            <label
              htmlFor="image"
              className="cursor-pointer bg-[#345e42] hover:bg-emerald-700 py-2 px-3 border
               border-gray-600 rounded-md shadow-sm text-sm leading-4
                font-medium text-gray-300  focus:outline-none
                 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
          </div>

          <label
            htmlFor="name"
            className="block m-2 text-sm font-bold text-[#345E42]"
          >
            Product Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className=" m-2 block text-sm font-bold text-[#345E42]"
          >
            Description
          </label>
          <TextArea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
            placeholder="Sophisticated product with...."
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block m-2 text-sm font-bold text-[#345E42]"
          >
            Price
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="categories"
            className="block m-2 text-sm font-bold text-[#345E42]"
          >
            Categories
          </label>

          <Select
            id="categories"
            name="categories"
            itemName="Category"
            selection={categories}
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value,
              })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full flex mt-3 justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
