import React from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {

    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    return (
        <Layout title={'EcomSite - Dashboard'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <ul className="list-group text-center">
                            <li className="list-group-item">User Name : {auth?.user?.name}</li>
                            <li className="list-group-item">User Email Id : {auth?.user?.emailId}</li>
                            <li className="list-group-item">User Phone No. : {auth?.user?.phoneNumber}</li>
                            <li className="list-group-item">User Address : {auth?.user?.address}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard; 