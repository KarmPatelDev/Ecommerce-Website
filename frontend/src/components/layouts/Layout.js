import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author}></meta>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{minHeight: "79vh"}}>
                
                {children}
            </main>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "EcomSite",
    description: "You can buy the products from EcomSite",
    keywords: "mobile, laptop, accessories, watches",
    author: "Karm Patel"
}
export default Layout;