import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
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
            <table key={orderDetails.id}>
                <tbody>
                    <tr>
                        <td style={{ width: "200px", color: "#777777" }}>
                            Order ID:
                    </td>
                        <td>
                            {orderDetails.id}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Recipient Name:
                    </td>
                        <td>
                            {orderDetails.recipient_name}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Recipient Address:
                    </td>
                        <td>
                            {orderDetails.recipient_address}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Subtotal:
                    </td>
                        <td>
                            ${(orderDetails.total_cost / 100).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Completed on:
                    </td>
                        <td>
                            {orderDetails.date_of_completion !== null ? orderDetails.date_of_completion.slice(0, 10) : "-"}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Status:
                    </td>
                        <td>
                            {orderDetails.status.name}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const displayOrderItems = () => {
        // Map the array
        let lst = []
        for (let i of orderItem) {
            lst.push(
                <React.Fragment>
                    <div className="row mt-2 mb-2" key={i.id}>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="product-img-container" style={{
                                backgroundImage: `url(${i.tea.image})`
                            }} ></div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            <Link className="order-indi-title" to={"/products/" + i.tea.id}>{i.tea.name}</Link>
                            <p className="cart-indi-des">Quantity: {i.quantity}</p>
                            <p className="cart-indi-des">{i.tea.description}</p>
                            <div className="cart-indi-cost">
                                <p>${(i.tea.cost * i.quantity / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <p className="light-grey-line mt-3"></p>
                </React.Fragment>
            )
        }
        if (lst[0] === undefined) {
            return (<div>No items to display</div>)
        } else {
            return lst
        }
    }

    if (isLoaded === false) {
        return (
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="page-width" style={{ display: "block" }}>
                    <h1>Order Information</h1>
                    <p className="grey-line"></p>
                    {displayOrderDetails()}
                    <h1 className="mt-3">Item Details</h1>
                    <p className="grey-line"></p>
                    {displayOrderItems()}
                </div>
            </React.Fragment>
        )
    }
}