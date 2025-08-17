import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import { Input } from "../../components/FormElements";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const pendingItem = location.state?.pendingItem;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    if (pendingItem) {
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login to Continue
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-card-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
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
                value={email}
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-primary"
              >
                Password
              </label>
              <Input
                icon={
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                value={password}
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●●●●●"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
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
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-700 hover:text-emerald-600"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
