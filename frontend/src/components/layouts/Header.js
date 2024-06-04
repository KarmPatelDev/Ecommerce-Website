import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import SearchForm from "../forms/SearchForm";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";

const Header = () => {

    const [auth, setAuth] = useAuth();
    // eslint-disable-next-line
    const [cart, setCart] = useCart();

    const categories = useCategory();

    const handleLogout = async () => {

        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/logout`);

        if(res.data.success){
            setAuth({
                ...auth,
                user: null,
                token: ""
            });
            localStorage.removeItem("auth");
            toast.success("Logout Successful");
        }
        else{
            toast.success("Logout Unsuccessful");
        }

    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <HiMiniShoppingBag/> EcomSite
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <SearchForm />
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <div className="dropdown">
                            <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Category</NavLink>
                            <ul className="dropdown-menu">
                            <li><Link to={`/product-categories`} className="nav-link">All Categories</Link></li>           
                            {
                                categories.map((category) => (<li key={category._id}><Link to={`/category/${category.slug}`} className="nav-link">{category?.name}</Link></li>))
                            }
                            </ul>
                        </div>
                        {
                            (!auth.user) ? (<>
                            <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            </>) : (<>
                                <div className="dropdown">
                                    <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{auth?.user?.name}</NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="nav-link">Dashboard</NavLink></li>
                                        <li><NavLink onClick={handleLogout} to="/login" className="nav-link">Logout</NavLink></li>
                                    </ul>
                                </div>
                            </>)
                        }
                        <li className="nav-item">
                        <div className="nav-cart">
                        <NavLink to="/cart" className="nav-link"><AiOutlineShoppingCart /> <span>{cart.length}</span></NavLink>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;