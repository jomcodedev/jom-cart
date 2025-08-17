import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore.js";
import { motion } from "framer-motion";
import CartItem from "../components/Cart/CartItem.jsx";
import EmptyCartUI from "../components/Cart/EmptyCartUI.jsx";
import Recommendation from "../components/Cart/Recommendation.jsx";
import OrderSummary from "../components/Cart/OrderSummary.jsx";
import GiftCouponCart from "../components/Cart/GiftCouponCart.jsx";
const CartPage = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex items-center justify-center gap-3">
          <ShoppingCart className="w-10 h-10" />
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length <= 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <Recommendation />}
          </motion.div>
          {cart.length > 0 && (
            <motion.div
              className=" mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCart />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
