import React from "react";
import { ProductListing } from "./ProductListing";
import { Link } from "react-router-dom"

export default function Product() {
    return (
        <React.Fragment>
            <section style={{padding: "0em 2em"}}>
                <div className="mt-2 mb-4 nav-route">
                    <Link className="nav-link-tag" to="/">HOME </Link>
                    /
                    <Link className="nav-link-tag" to="/products"> PRODUCTS </Link>
                </div>
            <ProductListing />
            </section>
        </React.Fragment>
    );
}