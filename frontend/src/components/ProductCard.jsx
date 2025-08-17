import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore.js";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddtoCart = async () => {
    if (!user) {
      toast.error("Please login to continue");

      navigate("/login", { state: { pendingItem: product } });

      return;
    } else {
      await addToCart(product);
    }
  };
  return (
    <div
      className="flex w-full relative flex-col 
    overflow-hidden rounded-lg border-gray-700 shadow-lg"
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt="Product Photo Preview"
        />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg
         bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium hover:bg-emerald-500"
          onClick={handleAddtoCart}
        >
          <ShoppingCart size={22} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
