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
                    setCartItem(response.data)
                    // let subTotal = 0;
                    // for (let i of response.data) {
                    //     subTotal += (i.tea.cost * i.quantity)
                    // }
                    // setTotalCost(subTotal)
                    setisLoaded(true)
                } else {
                    // Unable to load cart, please refresh page or relogin. 

                }
            }
            fetch()
        } else {
            setisLoaded(true)
            // If not logged in, change is loaded true and send him to user login page
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let subTotal = 0;
        for (let i of cartItem) {
            subTotal += (i.tea.cost * i.quantity)
        }
        setTotalCost(subTotal)
    }, [cartItem])

    const decrementQty = async (e) => {
        // Get index
        const teaIndex = cartItem.findIndex(p => p.tea.id === parseInt(e.target.name))
        // Clone state
        let cloned = [...cartItem]
        // Replace the data
        if (cloned[teaIndex].quantity > 1) {
            cloned[teaIndex].quantity -= 1;
        } else {
            // nothing happen, qty already 1 
        }
        // Set back the state
        setCartItem(cloned)
    }

    const incrementQty = async (e) => {
        const teaIndex = cartItem.findIndex(p => p.tea.id === parseInt(e.target.name))
        let cloned = [...cartItem]
        cloned[teaIndex].quantity += 1
        setCartItem(cloned)
    }

    // const showTotalCost = () => {
    //     let subTotal = 0;
    //     for (let i of cartItem) {
    //         subTotal += (i.tea.cost * i.quantity)
    //     }
    //     setTotalCost(subTotal)
    // }

    const updateQty = async (e) => {
        let userId = localStorage.getItem("id")
        let response = await axios.post(`${baseUrl}/api/cart/${userId}/${e.target.name}/update`, {
            "quantity": e.target.value
        })
        console.log(response)
        // showTotalCost()

    }

    const DeleteItem = async (e) => {
        let userId = localStorage.getItem("id")
        let response = await axios.get(`${baseUrl}/api/cart/${userId}/${e.target.name}/remove`)
        console.log(response)
        // Get index
        const teaIndex = cartItem.findIndex(p => p.tea.id === parseInt(e.target.name))
        // Clone state
        let cloned = [...cartItem]
        // Remove the tea item using splice
        cloned.splice(teaIndex, 1)

        setCartItem(cloned)

    }

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
                                <button onClick={decrementQty} name={p.tea.id} value={p.quantity}>-</button>
                                <p>{p.quantity}</p>
                                <button onClick={incrementQty} name={p.tea.id} value={p.quantity}>+</button>
                                <button onClick={updateQty} name={p.tea.id} value={p.quantity}>Update</button>
                                <button onClick={DeleteItem} name={p.tea.id}>Delete</button>
                            </div>
                        </div>)
                }
                <p> Total Cost: ${(totalCost / 100).toFixed(2)} </p>
                {/* <button onClick={checkout}>Checkout</button> */}
            </React.Fragment>
        )
    }
}