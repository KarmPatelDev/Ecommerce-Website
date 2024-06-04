import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";

const ProductCard = ({product}) => {

    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <>
            <div className="card m-2" style={{ width: "25rem", height: "30rem", overflow: "hidden" }} key={product._id}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top p-2" alt={`${product.name.substring(0, 120)}...`} height={'200px'} width={'200px'}/>
                <div className="card-body">
                    <h5 className="card-title">{product.name.substring(0, 120)}...</h5>
                    <p className="card-text">{product.description.substring(0, 120)}...</p>
                    <h6>Rs. {product.price}</h6>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem('cart', JSON.stringify([...cart, product]));
                        toast.success("Item Added To Cart");
                    }}>Add To Cart</button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;