import React from "react";
import useCategory from "../../hooks/useCategory";
import Layout from "../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
    const categories = useCategory();
    const navigate = useNavigate();

    return (
        <Layout title={`'EcomSite - Product Categories'`}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="card m-3 p-3">
                        <h4> All Categories </h4>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <tr key={category._id}>
                                            <th>{index + 1}</th>
                                            <td>{category.name}</td>
                                            <td>
                                                <button className="btn btn-primary ms-2" onClick={() => navigate(`/category/${category.slug}`)}>Click Here</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>    
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ProductCategories;