import React,{useState, useEffect} from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/Cart";
import ProductCard from "../../components/layouts/ProductCard";

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [cart, setCart] = useCart();

    const getProduct = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);

            if(res.data.success){
                setProduct(res.data.product);
                getRelatedProducts(res.data.product._id, res.data.product.category._id);
            }
            else{
                toast.error(res.data.error);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong.");
        }
    };

    const getRelatedProducts = async (pid, cid) => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`);

            if(res.data.success){
                setRelatedProducts(res.data.products);
            }
            else{
                toast.error(res.data.error);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong.");
        }
    };

    useEffect(() => {
        if(params.slug) getProduct();
        // eslint-disable-next-line
    }, [params.slug]);

    return (
        <Layout title={'EcomSite - Product Details'}>
            <div className="container-fluid p-5">
                <div className="row">
                    <h3 className="mb-3">{product.name}</h3>
                    <div className="col-md-4 card p-3">
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top p-5" alt={`{product.name.substring(0, 120)}...`} height={'350px'} width={'100px'}/>
                    </div>
                    <div className="col-md-7 p-3 ms-3">
                        <h4>Description:</h4>
                        <p>{product.description}</p>
                        <h4>Category:</h4>
                        <p>{product?.category?.name}</p>
                        <h4>Price:</h4>
                        <p>{product.price}</p>
                        <button className="btn btn-secondary" onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success("Item Added To Cart");
                        }}>Add To Cart</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 card p-3">
                        <h4>Similar Products:</h4>
                        { relatedProducts.length < 1 && (<h6>No Similar Product Found</h6>)}
                        <div className="d-flex flex-wrap">
                            {
                                relatedProducts?.map((p) => <ProductCard product={p} key={p._id}/>)
                            }
                        </div>
                    </div>
                </div> 
            </div>
        </Layout>
    );
};

export default ProductDetails;