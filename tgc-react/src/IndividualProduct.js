import React, { useEffect, useState } from "react"
import config from "./config"
import axios from "axios"
import { useParams } from "react-router-dom"

const baseUrl = config.baseUrl

export default function IndividualProduct() {
    let { tea_id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState(0)
    const [waterTemp, setWaterTemp] = useState(0)
    const [steepTime, setSteepTime] = useState("")
    const [serving, setServing] = useState("")
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [packing, setPacking] = useState("")
    const [origin, setOrigin] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/products/" + tea_id)
            setName(response.data.name)
            setDescription(response.data.description)
            setCost(response.data.cost / 100)
            setWaterTemp(response.data.water_temperature)
            setSteepTime(response.data.steep_time)
            setServing(response.data.serving)
            setStock(response.data.stock)
            setImage(response.data.image)
            setBrand(response.data.brand.name)
            setPacking(response.data.package.name)
            setOrigin(response.data.origin.name)
            setType(response.data.type.name)
            setIsLoaded(true)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <React.Fragment>
                <p>Individual Items</p>
                <p>{name}</p>
                <p>{description}</p>
                <p>${cost.toFixed(2)}</p>
                <p>{waterTemp}</p>
                <p>{steepTime}</p>
                <p>{serving}</p>
                <p>{stock}</p>
                <p class="img-container" style={{
                    backgroundImage: `url(${image})`
                }}></p>
                <p>{brand}</p>
                <p>{packing}</p>
                <p>{origin}</p>
                <p>{type}</p>
            </React.Fragment>
        )
    }
}