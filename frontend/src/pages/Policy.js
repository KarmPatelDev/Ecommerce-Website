import React from "react";
import Layout from "../components/layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Policy = () => {
    return (
        <Layout title={'EcomSite - Privacy Policy'}>
            <div className="row contact d-flex align-items-center justify-content-center">
                <div className="col-md-6 my-1">
                    <img src="/images/pages/privacypolicy.png" alt="Contact Us" style={{ width: "100%"}} />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
                    <p className="text-justify mt-2">
                        Our Site follow this Policies and Rules and Regulations.
                    </p>
                    <p className="mt-3">
                        <BiMailSend />: www.help@ecommerceapp.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall />: 012-3456789
                    </p>
                    <p className="mt-3">
                        <BiSupport />: 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div> 
        </Layout>
    );
}

export default Policy;