import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"

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
                let response = await axios.get(baseUrl + "/api/orders/" + userId)
                if (response.data !== "No Orders") {
                    setOrderList(response.data.reverse())
                } else {
                    //No order is retrieved, user has no order. 
                }
                setIsLoaded(true)
            }
            fetch()
        } else {
            setIsLoaded(true)
        }
    }, [])

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <React.Fragment>
                <p>Order </p>
            </React.Fragment>
        )
    }
}