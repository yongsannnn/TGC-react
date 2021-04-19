import React, { useState, useEffect } from "react"
import config from "./config"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {useParams} from "react-router-dom"

const baseUrl = config.baseUrl
export default function EditAccount() {
    // let match = useRouteMatch("/edit/:user_id")
    // let id = match.params.user_id
    // console.log(match)
    let { user_id } = useParams();
    const history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [isPasswordSame, setIsPasswordSame] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(baseUrl + "/api/users/edit/" + user_id)
            setName(response.data.name)
            setEmail(response.data.email)
            setAddress(response.data.address)
            setPhone(response.data.contact_number)
            setDate(response.data.date_of_birth.slice(0, 10))
        }
        fetch()
        // eslint-disable-next-line
    }, [])
    return (
        <React.Fragment>
            <p>Editing Account {user_id}</p>

            <div>
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="date" placeholder="Date of Birth" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <input type="number" placeholder="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                <input type="text" placeholder="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <button onClick={
                () => {
                    if (changePassword === true) {
                        setChangePassword(false)
                    } else {
                        setChangePassword(true)
                    }
                }
            }>Change Password</button>
            <div style={{
                display: changePassword === true ? "block" : "none"
            }}>
                <input type="password" placeholder="New Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" placeholder="Confirm New Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <p style={{ display: isPasswordSame === true ? "block" : "none" }}>Password is not the same!! </p>

                <button onClick={
                    async () => {
                        if (password !== confirmPassword) {
                            setIsPasswordSame(true)
                        } else{
                            const response = await axios.post(baseUrl + "/api/users/edit/" + user_id,{
                                "password": password
                            })
                            if (response.data === "Password Updated" ){
                                history.push("/")
                            } else {
                                console.log(response.data)
                            }
                        }
                    }
                }>Update Password</button>
            </div>


        </React.Fragment>

    )
}
