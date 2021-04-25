import React, { useState, useEffect } from "react"
import config from "../config"
import axios from "axios"
import { Link } from "react-router-dom"

const baseUrl = config.baseUrl

export function ProductListing() {
    const [products, setProducts] = useState([])
    // const [type, setType] = useState("")
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products")
            setProducts(response.data)
        }
        fetch()
    }, [])

    const searchQuery = async () => {
        const response = await axios.post(baseUrl + "/api/products/search", {
            "name": searchName
        })
        setProducts(response.data)
    }

    const resetQuery = async () => {
        const response = await axios.get(baseUrl + "/api/products")
        setProducts(response.data)
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-2">
                    <div className="indi-spacing"></div>
                    <div className="filter-header mb-2">
                        <h6>Filter</h6>
                        <button className="reset-btn" onClick={resetQuery}><i class="fas fa-sync-alt"></i></button>
                    </div>
                    <input type="text" className="login-input" name="searchName" placeholder="Search By Name" onChange={(e) => setSearchName(e.target.value)}></input>
                    <button type="submit" className="cta" onClick={searchQuery}>Search</button>
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