import React, { useEffect, useState } from "react"
import config from "./config"
import axios from "axios"
import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl


export default function Cart() {
    const history = useHistory();

    const [isLoaded, setisLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartItem, setCartItem] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        // Check if user is logged in
        if (localStorage.getItem("id") !== null) {
            setIsLoggedIn(true)
            // If logged in, run function to get all items in the cart
            const fetch = async () => {
                let response = await axios.get(baseUrl + "/api/cart/" + localStorage.getItem("id"))
                if (response.data !== "Unable to get all items.") {
                    let subTotal = 0;
                    for (let i of response.data) {
                        subTotal += (i.tea.cost * i.quantity)
                    }
                    setTotalCost(subTotal)
                    setCartItem(response.data)
                    setisLoaded(true)
                } else {
                    // Unable to load cart, please refresh page or relogin. 

                }
            }
            fetch()
        } else {
            console.log(isLoaded)
            setisLoaded(true)
            // If not logged in, change is loaded true and send him to user login page
        }
        // eslint-disable-next-line
    }, [])

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else if (isLoaded === true && isLoggedIn === false) {
        history.push("/login")
    } else {
        return (
            <React.Fragment>
                <p>Cart</p>
                {
                    cartItem.map(p =>
                        <div className="row" key={p.id}>
                            <div className="col-6">
                                <div className="img-container" style={{
                                    backgroundImage: `url(${p.tea.image})`
                                }}></div>
                            </div>
                            <div className="col-6">
                                <p>{p.tea.name}</p>
                                <p>${(p.tea.cost * p.quantity / 100).toFixed(2)}</p>
                                <p>Quantity: {p.quantity}</p>
                            </div>
                        </div>)
                }
                <p> Total Cost: ${(totalCost / 100).toFixed(2)} </p>
            </React.Fragment>
        )
    }
}