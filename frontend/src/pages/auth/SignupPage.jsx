import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Lock, Mail, ArrowRight, Loader, User } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../../components/FormElements.jsx";
import { useUserStore } from "../../stores/useUserStore.js";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
  };
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[white]">
          Create your Account
        </h2>
      </motion.div>
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#F5E8D6] py-8 px-4 mt-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-[#345E42]"
              >
                Full Name
              </label>
              <Input
                icon={
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                value={formData.name}
                id="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL` */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-[#345E42]"
              >
                Email Address
              </label>
              <Input
                icon={
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                value={formData.email}
                id="email"
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#345E42]"
              >
                Password
              </label>
              <Input
                icon={
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                value={formData.password}
                id="password"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="●●●●●●●●●●"
              />
            </div>

            {/* CONFIRM PASSWORD  */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-[#345E42]"
              >
                Confirm Password
              </label>
              <Input
                icon={
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                value={formData.confirmPassword}
                id="confirmPassword"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="●●●●●●●●●●"
              />
            </div>

            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent
            rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500
            transition duration-150 ease-in-out disabled:opacity-50"
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
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Signup
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-700 hover:text-emerald-600"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
