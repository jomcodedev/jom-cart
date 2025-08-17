import { Lock, LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";

import useCartStore from "../stores/useCartStore.js";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const isUserAdmin = user?.role === "admin";

  const cart = useCartStore((state) => state.cart);

  return (
    <header
      className="fixed top-0 left-0 w-full z-40 bg-[#F5E8D6] bg-opacity-90 backdrop-blur-md
    shadow-lg transition-all duration-300 border-b border-emerald-400"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center ">
          <span
            className="flex items-center justify-center text-[#345E42] text-xl 
          font-bold tracking-wide hover:text-[#5DA573]"
          >
            <HiOutlineShoppingCart size={28} className="m-2 relative" />
            <Link to="/" className="text-2xl font-bold  items-center space-x-2">
              JomCart
            </Link>
          </span>

          <nav className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
            <Link to={"/"} className="text-[#345E42] hover:text-[#5DA573]">
              Home
            </Link>
            {user && (
              <Link to={"/cart"} className="relative group">
                <ShoppingCart
                  className="inline-block mr-1 text-[#345E42] group-hover:text-[#5DA573] 
                  transition duration-300 ease-in-out"
                  size={20}
                />
                <span className="hidden sm:inline text-[#345E42] group-hover:text-[#5DA573] ">
                  Cart
                </span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
                text-xs group-hover:bg-emerald-400 transtion duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isUserAdmin && (
              <Link
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md font-medium
                transition duration-300 ease-in-out flex items-center"
                to="secret-dashboard"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button
                className="bg-[#B05E4E] hover:bg-[#994E40] text-white py-2 px-3 rounded-md 
                                   flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline ml-2"> Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white 
                py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out "
                >
                  <UserPlus className="mr-2" size={16} />
                  Signup
                </Link>
                <Link
                  to={"/login"}
                  className="bg-[#5DA573] hover:bg-[#4A8F66] text-white 
                py-2 px-3 rounded-md flex items-center transition duration-300 ease-in-out "
                >
                  <LogIn className="mr-2" size={16} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
