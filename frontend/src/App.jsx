import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import Navbar from "./components/Navbar.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import useCartStore from "./stores/useCartStore.js";
import PrivateRoute from "./routes/PrivateRoutes.jsx";
import { useLocation } from "react-router-dom";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const getCartItems = useCartStore((state) => state.getCartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    getCartItems();

    const pendingItem = location.state?.pendingItem;

    if (pendingItem) {
      addToCart(pendingItem);
    }
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full   
             bg-[radial-gradient(ellipse_at_bottom,_#2E5F4C_0%,_#245042_35%,_#17362B_70%,_#0B1A16_100%)]"
          />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="secret-dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:category"
            element={user ? <CategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout/success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout/cancelled"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster limit={1} />
    </div>
  );
}

export default App;
