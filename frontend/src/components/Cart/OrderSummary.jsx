import React from "react";
import useCartStore from "../../stores/useCartStore.js";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import createCheckout from "../../lib/createCheckoutSession.js";
import useCouponStore from "../../stores/useCouponStore.js";

const OrderSummary = () => {
  const total = useCartStore((state) => state.total);
  const subtotal = useCartStore((state) => state.subtotal);
  const savings = useCartStore((state) => state.savings);
  const coupon = useCouponStore((state) => state.coupon);
  const isCouponApplied = useCouponStore((state) => state.isCouponApplied);
  const cart = useCartStore((state) => state.cart);

  const handlePayment = async () => {
    await createCheckout();
  };

  return (
    <div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 
    p-4 shadow-sm sm:p-6"
    >
      <p className="text-xl font-semibold text-[#f5e8d6]">Order Summary</p>
      <div className="space-y-4">
        <div className="spacey-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original Price
            </dt>
            <dt className="text-base font-normal text-gray-300">
              $ {subtotal.toFixed(2)}
            </dt>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-normal text-gray-300">
                $ {savings.toFixed(2)}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Coupon</dt>
              <dd className="text-base font-normal text-gray-300">
                - {coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-normal text-gray-300">Total</dt>
            <dd className="text-base font-normal text-gray-300">
              $ {total.toFixed(2)}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg 
          bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white 
          hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium
          text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
