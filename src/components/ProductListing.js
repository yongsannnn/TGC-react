import React, { useState, useEffect } from "react"
import config from "../config"
import axios from "axios"
import { Link } from "react-router-dom"

const baseUrl = config.baseUrl

export function ProductListing() {
    const [products, setProducts] = useState([])
    const [type, setType] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products")
            setProducts(response.data)
        }
        fetch()
    }, [])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-2">
                    {/* <h6>Filter</h6> */}
                </div>
                <div className="col-10">
                    <h3>Product</h3>
                    <div className="product-img" style={{
                        backgroundImage: `url(http://cdn.shopify.com/s/files/1/0311/4398/5197/collections/AOT-Loose-Leaf-Header-Banner_1800x.jpg?v=1586118019)`
                    }} >

                    </div>
                    <p className="mt-3 small-text">{products.length} ITEMS</p>
                    <div className="mt-4 row">
                        {
                            products.map(p =>
                                <div className="col-4 p-1 mb-3" key={p.id}>
                                    <div className="product-indi-img" key={p.id} style={{ backgroundImage: `url(${p.image})` }}></div>
                                    <div className="login-btn-wrapper">
                                        <Link to={"/products/" + p.id} className="mt-3 product-indi-link">{p.name}</Link>
                                    </div>
                                </div>)
                        }

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
} 