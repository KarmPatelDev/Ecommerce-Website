import React, {useEffect, useState} from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    useEffect(() => {
        getCategories();
    }, []);

    const createCategory = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name});

            if(res.data.success){
                setName("");
                toast.success(res.data.message);
                getCategories();
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

    const updateCategory = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selectedCategory._id}`, {name: updateName});

            if(res.data.success){
                setSelectedCategory(null);
                setUpdateName("");
                toast.success(res.data.message);
                getCategories();
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

    const deleteCategory = async (id) => {
        try{
            let answer = window.prompt("Are You Sure Want To Delete Category? (yes/no)");
            if(answer !== "yes") return;

            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);

            if(res.data.success){
                setSelectedCategory(null);
                toast.success(res.data.message);
                getCategories();
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

    return (
        <Layout title={'EcomSite - Manage Categories'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <h4> Create Category </h4>
                            <CategoryForm handleCategory={createCategory} value={name} setValue={setName} close={false} />
                        </div>
                        <div className="card m-3 p-3">
                            <h4> Categories </h4>
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
                                                <button className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => { setUpdateName(category.name); setSelectedCategory(category);}}>Edit</button>
                                                <button className="btn btn-danger ms-2" onClick={() => deleteCategory(category._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                            </table>
                        </div>
                        <div className="modal" tabIndex="-1" id="updateModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <CategoryForm handleCategory={updateCategory} value={updateName} setValue={setUpdateName} close={true} />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories; 