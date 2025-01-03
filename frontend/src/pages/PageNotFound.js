import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/Layout";

const PageNotFound = () => {
    return (
        <Layout title={'EcomSite - Page Not Found'}>
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">OOPs! Page Not Found</h2>
                <Link to="/" className="pnf-btn">
                    GO BACK
                </Link>
            </div>
        </Layout>
    );
}

export default PageNotFound;