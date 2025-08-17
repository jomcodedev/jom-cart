import React from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import useProductStore from "../../stores/useProductStore.js";

import LoadingSpinner from "../LoadingSpinner.jsx";

const ProductsList = () => {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const toggleFeaturedProduct = useProductStore(
    (state) => state.toggleFeaturedProduct
  );

  const deleteProduct = useProductStore((state) => state.deleteProduct);

  if (loading) return <LoadingSpinner />;
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-c text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-600 text-center">
                <td className=" px-6 py-4 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">$ {product.price?.toFixed(2)}</td>
                <td className="text-center">{product.category}</td>

                <td>
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-600 text-gray-300"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star />
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default ProductsList;
