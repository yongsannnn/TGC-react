import React, { useState, useEffect } from "react"
import config from "./config"
import axios from "axios"
import { Link } from "react-router-dom"

const baseUrl = config.baseUrl

export function ProductListing() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products")
            setProducts(response.data)
        }
        fetch()
    }, [])

    return (
        <React.Fragment>
            {
                products.map(p => <div key={p.id}>
                    <p>{p.name}</p>
                    <p>{p.cost}</p>
                    <p>{p.description}</p>
                    <Link to={"/products/" + p.id}>See more</Link>

                </div>)
            }
        </React.Fragment>
    )
} 