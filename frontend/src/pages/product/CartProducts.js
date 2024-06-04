import React, {useEffect, useState} from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartProduct = () => {

    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const removeFromCart = (id) => {
        try{
            let products = [...cart];
            let productIndex = products.findIndex((product) => (product._id === id));
            products.splice(productIndex, 1);
            setCart(products);
            localStorage.setItem('cart', JSON.stringify(products));
            toast.success("Item is Removed");
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    const totalPrice = () => {
        try{
            let total = 0;
            // eslint-disable-next-line
            cart?.map((item) => {total += item.price;});
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // Payment Token Generate
    const getPaymentToken = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);

            if(res?.data?.success){
                setClientToken(res?.data?.response?.clientToken);
            }
            else{
                toast.error(res?.data?.message);
            } 
        }
        catch(error){
            console.log(error);
        }
    };

    const handlePayment = async () => {
        try{
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {cart, nonce});
            setLoading(false);
        
            if(res?.data?.success){
                localStorage.removeItem("cart");
                setCart([]);
                navigate('/dashboard/user/orders');
                toast.success(res?.data?.message);
            }
            else{
                toast.error(res?.data?.message);
            } 
        }
        catch(error){
            console.log(error);
            setLoading(false);
            toast.error("Something Went Wrong.");
        }
    };

    useEffect(() => {
        getPaymentToken();
    }, [auth?.token]);

    return (
        <Layout title={'EcomSite - Cart Products'}>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="card p-3">
                        <div className="text-center">
                            <h2>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
                            <h4>{cart?.length > 0 ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : "Please, Login/SignUp To Checkout"}` : "Your Cart is Empty."}</h4>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-8">
                                {
                                    cart.map((product, index) => {
                                        return(
                                            <div className="row card flex-row mb-1" key={index}>
                                                <div className="col-md-4">
                                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top p-2" alt={`${product.name.substring(0, 120)}...`} height={'200px'} width={'200px'}/>
                                                </div>
                                                <div className="col-md-8 mt-2">
                                                    <h6 className="card-title">{product.name}</h6>
                                                    <p className="card-text">{product.description.substring(0, 80)}...</p>
                                                    <h6>Rs. {product.price}</h6>
                                                    <button className="btn btn-danger" onClick={() => removeFromCart(product._id)}>Remove</button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="col-md-4 text-center">
                                <h3>Cart Summary</h3>
                                <hr/>
                                <h5> TOTAL : <b style={{ color: "red" }}>{totalPrice()}</b></h5>
                                <hr/>
                                {auth?.user?.address ? (
                                    <div className="mb-3">
                                        <h5>Address</h5><p>{auth?.user?.address}</p>
                                        <button className="btn btn-warning" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        {
                                            auth?.token ? (<button className="btn btn-warning" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>) : (<button className="btn btn-warning" onClick={() => navigate('/login', {state : "/cart"})}>Login/SignUp To Checkout</button>)
                                        }
                                    </div>
                                )}
                                <hr/>
                                <div className="mb-3">
                                    {
                                        (!clientToken || !cart.length) ? ("") : (
                                            <>
                                            <DropIn options={{ authorization: clientToken, paypal: {flow: "vault"} }} onInstance={(instance) => setInstance(instance)} />
                                            <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.token}>{loading ? "Processing" : "Pay"}</button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartProduct;