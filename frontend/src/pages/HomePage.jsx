import React, { useEffect } from "react";

import CategoryItem from "../components/CategoryItem";
import { useUserStore } from "../stores/useUserStore.js";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import useProductStore from "../stores/useProductStore.js";

const HomePage = () => {
  const fetchFeaturedProducts = useProductStore(
    (state) => state.fetchFeaturedProducts
  );
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  const categories = [
    { href: "/bags", name: "Bags", imageURL: "/bag.jpg" },
    { href: "/cameras", name: "Cameras", imageURL: "camera.jpg" },
    { href: "/headphones", name: "Heaphones", imageURL: "/headphone.jpg" },
    { href: "/shades", name: "Shades", imageURL: "/shade.jpg" },
    { href: "/shoes", name: "Shoes", imageURL: "/shoe.jpg" },
    { href: "/tumblers", name: "Tumblers", imageURL: "/tumbler.jpg" },
    { href: "/watches", name: "Watches", imageURL: "/watch.jpg" },
  ];
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-4">
          Explore our Categories
        </h1>
        <p className="text-center text-xl text-gray-400">
          Discover the fashion within
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        {!loading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
