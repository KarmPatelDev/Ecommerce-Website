import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {

    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    return (
        <Layout title={'EcomSite - Admin Dashboard'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <ul className="list-group text-center">
                            <li className="list-group-item">Admin Name : {auth?.user?.name}</li>
                            <li className="list-group-item">Admin Email Id : {auth?.user?.emailId}</li>
                            <li className="list-group-item">Admin Phone No. : {auth?.user?.phoneNumber}</li>
                            <li className="list-group-item">Admin Address : {auth?.user?.address}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard; 