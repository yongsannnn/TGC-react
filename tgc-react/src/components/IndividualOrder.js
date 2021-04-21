import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { useParams } from "react-router-dom"
const baseUrl = config.baseUrl


export default function IndividualOrder() {
    const { order_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [orderItem, setOrderItem] = useState([])

    useEffect(()=>{
        const fetch = async () => {
            const response = await axios.get(baseUrl+ "/api/orders/ind/" + order_id)
            console.log(response)
            setOrderItem(response.data)
            setIsLoaded(true)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    const displayOrderDetails = () => {
        // Display details of the order
    }

    const displayOrderItems = () => {
        // Map the array
    }

    if (isLoaded === false){
        return (
            <div>Loading</div>
        )
    } else {
        return(
            <React.Fragment>
                <p>Individual Order</p>
                <p>ORDER DETAILS</p>

                <p>ITEM DETAILS</p>  
            </React.Fragment>
        )
    }
}