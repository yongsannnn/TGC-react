import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { useParams } from "react-router-dom"
const baseUrl = config.baseUrl


export default function IndividualOrder() {
    const { order_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [orderItem, setOrderItem] = useState([])
    const [orderDetails, setOrderDetail] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/orders/ind/" + order_id)
            // console.log(response)
            setOrderItem(response.data)
            const detailsResponse = await axios.get(baseUrl + "/api/orders/" + order_id)
            // console.log(detailsResponse)
            setOrderDetail(detailsResponse.data)
            setIsLoaded(true)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    const displayOrderDetails = () => {
        // Display details of the order
        return (
            <div key={orderDetails.id}>
                <p>Order ID: {orderDetails.id}</p>
                <p>Recipient Name: {orderDetails.recipient_name}</p>
                <p>Recipient Address: {orderDetails.recipient_address}</p>
                <p>Total Cost: ${(orderDetails.total_cost / 100).toFixed(2)}</p>
                <p>Ordered on: {orderDetails.date_of_order.slice(0, 10)}</p>
                <p>Completed on: {orderDetails.date_of_completion !== null ? orderDetails.date_of_completion.slice(0, 10) : "-"}</p>
                <p>Status: {orderDetails.status.name}</p>
            </div>

        )


    }

    const displayOrderItems = () => {
        // Map the array
        let lst = []
        for (let i of orderItem) {
            lst.push(
                <div key={i.id}>
                    <p>{i.tea.name}</p>
                    <p>{i.quantity}</p>
                    <div className="product-img-container" style={{
                        backgroundImage: `url(${i.tea.image})`
                    }} ></div>
                </div>
            )
        }
        if (lst[0] === undefined){
            return (<div>No items to display</div>)
        } else {
            return lst
        }
    }

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <React.Fragment>
                <p>Individual Order</p>
                <p>ORDER DETAILS</p>
                {displayOrderDetails()}
                <p>ITEM DETAILS</p>
                {displayOrderItems()}
            </React.Fragment>
        )
    }
}