import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl


export default function Cart() {
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)
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
                    setIsLoaded(true)
                } else {
                    // Unable to load cart, please refresh page or relogin. 

                }
            }
            fetch()
        } else {
            setIsLoaded(true)
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
        let userId = localStorage.getItem("id")
        await axios.post(`${baseUrl}/api/cart/${userId}/${e.target.name}/update`, {
            "quantity": cloned[teaIndex].quantity
        })
    }

    const incrementQty = async (e) => {
        const teaIndex = cartItem.findIndex(p => p.tea.id === parseInt(e.target.name))
        let cloned = [...cartItem]
        cloned[teaIndex].quantity += 1
        setCartItem(cloned)
        let userId = localStorage.getItem("id")
        await axios.post(`${baseUrl}/api/cart/${userId}/${e.target.name}/update`, {
            "quantity": cloned[teaIndex].quantity
        })
    }

    // const updateQty = async (e) => {
    //     let userId = localStorage.getItem("id")
    //     let response = await axios.post(`${baseUrl}/api/cart/${userId}/${e.target.name}/update`, {
    //         "quantity": e.target.value
    //     })
    //     console.log(response)
    //     // showTotalCost()

    // }

    const deleteItem = async (e) => {
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
                <div className="page-width" style={{ display: "block" }}>
                    <h1 className="mb-2">My Cart</h1>
                    {
                        cartItem.map(p =>
                            <React.Fragment>
                                <div className="row mt-2 mb-3" key={p.id}>
                                    <div className="col-3">
                                        <div className="cart-img-container" style={{
                                            backgroundImage: `url(${p.tea.image})`
                                        }}></div>
                                    </div>
                                    <div className="col-9">
                                        <h3 style={{color: "#4a4a4a"}}>{p.tea.name}</h3>
                                    <p className="cart-indi-des">{p.tea.description}</p>
                                        <div className="cart-update-qty-box mb-2">
                                            <button className="cart-update-qty mr-2" onClick={decrementQty} name={p.tea.id} value={p.quantity}>-</button>
                                            {p.quantity}
                                            <button className="cart-update-qty ml-2" onClick={incrementQty} name={p.tea.id} value={p.quantity}>+</button>
                                        </div>
                                        <button className="cart-qty-cta mb-1" onClick={deleteItem} name={p.tea.id}><i className="fas fa-trash"></i></button>
                                        <div className="cart-indi-cost">
                                            <p>${(p.tea.cost * p.quantity / 100).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="grey-line"></p>
                            </React.Fragment>
                        )
                    }
                    <div className="cart-total-cost">
                    <p> SUBTOTAL:</p>
                    <p>  ${(totalCost / 100).toFixed(2)}  </p>
                    </div>
                    <div className="cart-checkout">
                        <a className="cta" href={"https://3000-blue-cicada-r1im72vl.ws-us03.gitpod.io/api/checkout/" + localStorage.getItem("id")}>Checkout</a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}