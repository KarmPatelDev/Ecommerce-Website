import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";

const ManageUsers = () => {

    return (
        <Layout title={'EcomSite - All Users'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageUsers; 