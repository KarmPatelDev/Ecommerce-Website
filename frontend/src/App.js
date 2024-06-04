import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from './pages/user/Dashboard';
import AdminPrivateRoute from './components/routes/AdminPrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCategories from './pages/admin/ManageCategories';
import CreateProducts from './pages/admin/CreateProducts';
import UpdateProduct from './pages/admin/UpdateProduct';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import SearchProducts from './pages/product/SearchProducts';
import ProductDetails from './pages/product/ProductDetails';
import ProductCategories from './pages/product/ProductCategories';
import CategoryProducts from './pages/product/CategoryProducts';
import CartProducts from './pages/product/CartProducts';
import ManageOrders from './pages/admin/ManageOrders';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminPrivateRoute />} >
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/manage-categories" element={<ManageCategories />} />
        <Route path="admin/create-products" element={<CreateProducts />} />
        <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
        <Route path="admin/manage-products" element={<ManageProducts />} />
        <Route path="admin/manage-users" element={<ManageUsers />} />
        <Route path="admin/manage-orders" element={<ManageOrders />} />
        <Route path="admin/profile" element={<AdminProfile />} />
      </Route>
      <Route path="/search-products" element={<SearchProducts />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/product-categories" element={<ProductCategories />} />
      <Route path="/category/:slug" element={<CategoryProducts />} />
      <Route path="/cart" element={<CartProducts />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  );
}

export default App;
