import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/Product/ProductDetails";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import OrderDetails from "./Pages/OrderDetails";
import MyorderPage from "./Pages/MyorderPage";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHomepage from "./Pages/AdminHomepage";
import UserManagementPage from "./Components/Admin/UserManagementPage";
import ProductManagement from "./Components/Admin/ProductManagement";
import EditProductPage from "./Components/Admin/EditProductPage";
import OrderManagementPage from "./Components/Admin/OrderManagementPage";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Wrap Home inside UserLayout using Outlet */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="/my-orders" element={<MyorderPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomepage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="product/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
