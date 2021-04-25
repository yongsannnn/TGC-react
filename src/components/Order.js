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
                <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.status.name}</td>
                    <td>{o.date_of_order.slice(0, 10)}</td>
                    <td>${(o.total_cost/100).toFixed(2)}</td>
                    <td>{o.date_of_completion === null ? "-" : o.date_of_completion.slice(0,10)}</td>
                    <td><Link className="footer-link-cta" to={"/order/" + o.id}>Manage</Link>
                    </td>
                </tr>
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
             <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading"/>
        )
    } else {
        return (
            <React.Fragment>
                <div className="page-width">
                    <div className="login-wrapper orders-wrapper">
                        <h1>My Orders </h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Placed on
                                    </th>
                                    <th>
                                        Subtotal
                                    </th>
                                    <th>
                                        Completed on
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayOrders()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}