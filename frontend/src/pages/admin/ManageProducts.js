import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);

            if(res.data.success){
                setProducts(res.data.products);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Something Went Wrong.');
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Layout title={'EcomSite - Manage Products'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className="text-center">All Products List</h4>
                        <div className="d-flex flex-wrap">
                        {
                            products?.map((product) => {
                                return (
                                    <Link key={product._id} to={`/dashboard/admin/update-product/${product.slug}`} className="product-link">
                                        <div className="card m-2" style={{ width: "25rem", height: "28rem", overflow: "hidden" }} >
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top p-2" alt={`${product.name.substring(0, 120)}...`} height={'200px'} width={'200px'}/>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name.substring(0, 120)}...</h5>
                                                <p className="card-text">{product.description.substring(0, 120)}...</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ManageProducts;