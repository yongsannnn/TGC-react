import React, { useState, useEffect } from "react"
import config from "../config"
import axios from "axios"
import { Link } from "react-router-dom"

const baseUrl = config.baseUrl

export function ProductListing() {
    const [products, setProducts] = useState([])
    // const [type, setType] = useState("")
    const [searchName, setSearchName] = useState("")
    const [searchPackage, setSearchPackage] = useState("")
    const [searchType, setSearchType] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products")
            setProducts(response.data)
            setIsLoaded(true)
        }
        fetch()
    }, [])

    const searchQuery = async () => {
        let searchLoad = {}
        if (searchName !== "") {
            searchLoad.name = searchName
        }

        if (searchPackage !== "- Package Type -" && searchPackage !== "") {
            searchLoad.package_id = searchPackage
        }

        if (searchType !== "- Tea Type -" && searchType !== "") {
            searchLoad.type_id = searchType
        }
        const response = await axios.post(baseUrl + "/api/products/search", searchLoad)
        setProducts(response.data)
    }

    const resetQuery = async () => {
        const response = await axios.get(baseUrl + "/api/products")
        setProducts(response.data)
        setSearchPackage("")
        setSearchType("")
        setSearchName("")
    }

    if (isLoaded === false) {
        return (
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 col-lg-3 col-xl-2">
                        <div className="filter-header mb-2">
                            <h3>Filter</h3>
                            <button className="reset-btn" onClick={resetQuery}><i class="fas fa-sync-alt"></i></button>
                        </div>
                        <input type="text" className="login-input" name="searchName" placeholder="Search By Name" value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
                        <select className="login-input" name="searchPackage" value={searchPackage} onChange={(e) => setSearchPackage(e.target.value)}>
                            <option defaultValue>- Package Type -</option>
                            <option value="1">Loose Leaf Tea</option>
                            <option value="2">Teabag Sachets</option>
                        </select>
                        <select className="login-input" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option defaultValue>- Tea Type -</option>
                            <option value="1">Black Tea</option>
                            <option value="2">Green Tea</option>
                            <option value="3">Oolong Tea</option>
                            <option value="4">Pu-Erh Tea</option>
                            <option value="5">White Tea</option>
                        </select>
                        <button type="submit" className="cta search-btn" onClick={searchQuery}>Search</button>
                    </div>
                    <div className="col-12 col-lg-9 col-xl-10">
                        <h3>Product</h3>
                        <div className="product-img" style={{
                            backgroundImage: `url(http://cdn.shopify.com/s/files/1/0311/4398/5197/collections/AOT-Loose-Leaf-Header-Banner_1800x.jpg?v=1586118019)`
                        }} >

                        </div>
                        <p className="mt-3 small-text">{products.length} ITEMS</p>
                        <div className="mt-4 row">
                            {
                                products.map(p =>
                                    <div className="col-12 col-md-6 col-lg-4 p-1 mb-3" key={p.id}>
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


}