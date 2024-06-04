import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../../components/layouts/ProductCard";

const CategoryProducts = () => {

    const [category, setCategory] = useState({});
    const [products,  setProducts] = useState([]);

    const params = useParams();

    const getProductByCategory = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-products/${params.slug}`);

            if(res.data.success){
                setProducts(res.data.products);
                setCategory(res.data.category);
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
        if(params?.slug) getProductByCategory();
        // eslint-disable-next-line
    }, [params?.slug]);

    return (
        <Layout title={'EcomSite - Category Products'}>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="card p-3">
                        <h3 className="text-center">{`${category?.name} Category Products`}</h3>
                        <h5 className="text-center">{products.length < 1 ? "No Products Found" : `${products.length} Products Found`}</h5>
                        <div className="d-flex flex-wrap">
                            {
                                products?.map((product) => <ProductCard product={product} key={product._id}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProducts;