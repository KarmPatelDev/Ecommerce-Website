import React,{useState, useEffect} from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Prices from "../components/Prices";
import ProductCard from "../components/layouts/ProductCard";

const HomePage = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredPrice, setFilteredPrice] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);

            if(res.data.success){
                setCategories(res.data.categories);
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

    const getProductsCount = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-count`);

            if(res.data.success){
                setProductsCount(res.data.productsCount);
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
        getCategories();
        getProductsCount();
    }, []);

    const getProducts = async () => {
        try{
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-list/${page}`);
            setLoading(false);
            if(res.data.success){
                setProducts(res.data.products);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            setLoading(false);
            console.log(error);
            toast.error('Something Went Wrong.');
        }
    };

    useEffect(() => {
        if(!filteredCategories.length && !filteredPrice.length) getProducts();
        // eslint-disable-next-line 
    }, []);

    const filterByCategories = (checked, id) => {
        let filterCat  = [...filteredCategories];
        checked ? filterCat.push(id) : filterCat = filterCat.filter((c_id) => (c_id !== id));
        setFilteredCategories(filterCat);
    };

    useEffect(() => {
        if(filteredCategories.length || filteredPrice.length) filterProducts();
        // eslint-disable-next-line
    }, [filteredCategories, filteredPrice]);

    const filterProducts = async () => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-products`, {filteredCategories, filteredPrice});

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

    const loadMoreProducts = async () => {
        try{
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-list/${page}`);
            setLoading(false);
            if(res.data.success){
                setProducts([...products, ...res.data.products]);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            setLoading(false);
            console.log(error);
            toast.error('Something Went Wrong.');
        }
    };

    useEffect(() => {
        if(page === 1) return;
        loadMoreProducts();
        // eslint-disable-next-line
    }, [page]);

    return (
        <Layout title={'EcomSite - Home'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card m-3 p-3">
                            <h4 className="text-center">Filter By Category</h4>
                            <div className="">
                                {
                                    categories?.map((category) => {
                                        return (
                                            <div className="form-check" key={category._id}>
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => filterByCategories(e.target.checked, category._id)}/>
                                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                                    {category.name}
                                                </label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="card m-3 p-3">
                            <h4 className="text-center">Filter By Price</h4>
                            <div className="">
                                {
                                    Prices?.map((price) => {
                                        return (
                                            <div className="form-check" key={price._id}>
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => setFilteredPrice(price.array)} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    {price.name}
                                                </label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="card m-3 p-3">
                            <button className="btn btn-danger" onClick={() => window.location.reload()} >Reset Filter</button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <h3 className="text-center">All Products</h3>
                            <div className="d-flex flex-wrap">
                                {
                                    products?.map((product) => <ProductCard product={product} key={product._id} />)
                                }
                            </div>
                            <div className="m-2 p-3">
                                {
                                    products && products.length < productsCount && (
                                        <button className="btn btn-danger" onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}>
                                            {loading ? "loading..." : "Load More"}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;