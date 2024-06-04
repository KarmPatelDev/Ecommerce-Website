import React from "react";
import Layout from "../../components/layouts/Layout";
import { useSearch } from "../../context/Search";
import ProductCard from "../../components/layouts/ProductCard";

const SearchProducts = () => {
    // eslint-disable-next-line
    const [search, setSearch] = useSearch();

    return (
        <Layout title={'EcomSite - Search Products'}>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="card p-3">
                        <h3 className="text-center">Search Products</h3>
                        <h5 className="text-center">{search.results.length < 1 ? "No Products Found" : `${search.results.length} Products Found`}</h5>
                        <div className="d-flex flex-wrap">
                            {
                                search.results?.map((product) => <ProductCard product={product} key={product._id}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SearchProducts;