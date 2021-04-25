import React, { useEffect, useState } from "react"
import config from "../config"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"

const baseUrl = config.baseUrl

export default function IndividualProduct() {
    let { tea_id } = useParams();
    let location = useLocation();
    console.log(location)
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState(0)
    const [waterTemp, setWaterTemp] = useState(0)
    const [steepTime, setSteepTime] = useState("")
    const [serving, setServing] = useState("")
    // const [stock, setStock] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [packing, setPacking] = useState("")
    const [origin, setOrigin] = useState("")
    // const [type, setType] = useState("")
    const [flavour, setFlavour] = useState([])
    const [ingredient, setIngredient] = useState("")
    const [noti, setNoti] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products/" + tea_id)
            setName(response.data.name)
            setDescription(response.data.description)
            setCost(response.data.cost / 100)
            setWaterTemp(response.data.water_temperature)
            setSteepTime(response.data.steep_time)
            setServing(response.data.serving)
            // setStock(response.data.stock)
            setImage(response.data.image)
            setBrand(response.data.brand.name)
            setPacking(response.data.package.name)
            setOrigin(response.data.origin.name)
            // setType(response.data.type.name)
            setFlavour(response.data.flavour)
            setIngredient(response.data.ingredient)
            setIsLoaded(true)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    if (isLoaded === false) {
        return (
             <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading"/>
        )
    } else {
        return (
            <React.Fragment>
                <div className="mt-2 mb-4 nav-route">
                    <Link className="nav-link-tag" to="/">HOME </Link>
                    /
                    <Link className="nav-link-tag" to="/products"> PRODUCTS </Link>
                     / {name}
                </div>

                <div className="row">
                    <div className="col-6">
                        <p className="indi-img-container" style={{
                            backgroundImage: `url(${image})`
                        }}></p>
                    </div>
                    <div className="col-6">
                        <h1 className="mb-4 indi-title">{name}</h1>
                        <p className="indi-flavour">TASTING NOTE: {flavour.map(p => p.name).join(", ")}</p>
                        <p>{description}</p>
                        <p className="indi-spacing"></p>
                        <p className="indi-ingredient">Ingredient: {ingredient}</p>
                        <p className="indi-spacing"></p>

                        <div className="row indi-table-container">
                            <div className="col-6">
                                <h4 className="indi-table-details">Steeping Instructions</h4>
                                <div className="pr-5">
                                    <table className="table">
                                        <tr className="indi-table-details">
                                            <td>
                                                <i className="fas fa-tint mr-2"></i> WATER TEMPERATURE
                                            </td>
                                            <td>
                                                {waterTemp} °C
                                            </td>
                                        </tr>
                                        <tr className="indi-table-details">
                                            <td>
                                               <i className="fas fa-hourglass-half mr-2"></i> STEEP TIME
                                            </td>
                                            <td>
                                                {steepTime}
                                            </td>
                                        </tr>
                                        <tr className="indi-table-details">
                                            <td >
                                                <i className="fas fa-mug-hot mr-2"></i>SERVING
                                            </td>
                                            <td>
                                                {serving}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="col-6">
                                <h4>Tea Origin</h4>
                                <div className="pr-5">
                                    <table className="table">
                                        <tr className="indi-table-details">
                                            <td>
                                                BRAND
                                            </td>
                                            <td>
                                                {brand}
                                            </td>
                                        </tr>
                                        <tr className="indi-table-details">
                                            <td>
                                                PACKING
                                            </td>
                                            <td>
                                                {packing}
                                            </td>
                                        </tr>
                                        <tr className="indi-table-details">
                                            <td>
                                                ORIGIN
                                            </td>
                                            <td>
                                                {origin}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <p className="indi-spacing"></p>
                        <button className="indi-add-to-cart" onClick={
                            async () => {
                                // check if user is logged in
                                if (localStorage.getItem("id") !== null) {
                                    // If user is logged in, push item into his cart
                                    let user_id = localStorage.getItem("id")
                                    await axios.get(baseUrl + "/api/cart/" + user_id + "/" + tea_id + "/add")
                                } else {
                                    // if user is not logged in, send him to login page first. 
                                    history.push("/login")

                                }
                                setNoti(true)
                                setTimeout(() => {
                                    setNoti(false)
                                }, 2000)
                            }
                        }>Add To Cart - ${cost.toFixed(2)}</button>
                        <p className="mt-2"style={{
                            display: noti === true ? "block" : "none"
                        }}>Item has been added to your cart</p>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}