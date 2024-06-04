import React, {useState, useEffect} from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);
    // eslint-disable-next-line
    const [allStatus, setAllStatus] = useState(["Order Placed", "Processing", "Shipped", "Out Of Delivery", "Delivered", "Return", "Cancel"]);

    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getOrders = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/manage-orders`);

            if(res.data.success){
                setOrders(res.data.orders);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        if(auth?.token) getOrders();
        // eslint-disable-next-line
    }, [auth?.token]);

    const updateStatus = async (id, changeStatus) => {
        try{
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-order-status/${id}`, {status: changeStatus});

            if(res.data.success){
                toast.success(res.data.message);
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <Layout title={'EcomSite - Manage Orders'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <h3>All Orders</h3>
                            {
                                orders.map((order, index) => {
                                    return (
                                        <div className="border mb-3">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                            <th scope="col">{index + 1}</th>
                                            <th scope="col">
                                                <select className="form-select p-1" aria-label="Default select example" onChange={(e) => updateStatus(order._id, e.target.value)} defaultValue={order?.status}>
                                                {allStatus?.map((status, index) => (<option key={index} value={status}>{status}</option>))}
                                                </select>
                                            </th>
                                            <th scope="col">{order?.buyer?.name}</th>
                                            <th scope="col">{moment(order?.createdAt).fromNow()}</th>
                                            <th scope="col">{order?.payment?.success ? "Success" : "Failed"}</th>
                                            <th scope="col">{order?.products?.length}</th>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                        {
                                            order.products.map((product) => {
                                                return (
                                                    <div className="row card flex-row m-3" key={product._id}>
                                                        <div className="col-md-3">
                                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top p-2" alt={`${product.name.substring(0, 120)}...`} height={'150px'} width={'150px'}/>
                                                        </div>
                                                        <div className="col-md-6 mt-2">
                                                            <h6 className="card-title">{product.name}</h6>
                                                            <p className="card-text">{product.description.substring(0, 80)}...</p>
                                                            <h6>Rs. {product.price}</h6>
                                                            <button className="btn btn-primary" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                        </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageOrders; 