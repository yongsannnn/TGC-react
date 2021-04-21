import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { Link } from "react-router-dom"


const baseUrl = config.baseUrl
export default function Order() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        // Check if user is logged in
        if (localStorage.getItem("id") !== null) {
            const userId = localStorage.getItem("id")
            const fetch = async () => {
                // Retrieve all orders for this user
                let response = await axios.get(baseUrl + "/api/orders/all/" + userId)
                if (response.data !== "No Orders") {
                    setOrderList(response.data.reverse())
                } else {
                    //No order is retrieved, user has no order. 
                }
            }
            fetch()
            setIsLoaded(true)
        } else {
            setIsLoaded(true)
        }
    }, [])

    const displayOrders = () => {
        let lst = []
        for (let o of orderList) {
            lst.push(
                <div key={o.id}>
                    <p>{o.id}</p>
                    <p>{o.status.name}</p>
                    <p>Order placed on: {o.date_of_order.slice(0, 10)}</p>
                    <Link to={"/order/" + o.id}>Manage</Link>

                </div>
            )
        }
        if (lst.length === 0) {
            lst.push(
                <div>No orders to display.</div>
            )
        }
        return lst
    }

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <React.Fragment>
                <p>Order </p>
                {displayOrders()}
            </React.Fragment>
        )
    }
}