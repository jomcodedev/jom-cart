import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard.jsx";
import useProductStore from "../../stores/useProductStore.js";

const Recommendation = () => {
  const getRecommendedProducts = useProductStore(
    (state) => state.getRecommendedProducts
  );
  const recommendedProducts = useProductStore(
    (state) => state.recommendedProducts
  );

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-col-3">
        {recommendedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Recommendation;
