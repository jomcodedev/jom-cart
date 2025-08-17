import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ProductsList from "../components/AdminPageComponents/ProductsList";
import CreateProductForm from "../components/AdminPageComponents/CreateProductForm";
import AnalyticsTab from "../components/AdminPageComponents/AnalyticsTab";
import useProductStore from "../stores/useProductStore.js";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
const tabs = [
  { id: "create", label: "Create a Product", icon: PlusCircle },
  { id: "products", label: "Product", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];
const tabComponents = {
  create: <CreateProductForm />,
  products: <ProductsList />,
  analytics: <AnalyticsTab />,
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8  text-center "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "text-primary bg-tabs"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {tabComponents[activeTab]}
      </div>
    </div>
  );
};

export default AdminPage;
