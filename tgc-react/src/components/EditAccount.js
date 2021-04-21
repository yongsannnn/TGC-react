import React, { useState, useEffect } from "react"
import config from "../config"
import axios from "axios"
import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl
export default function EditAccount() {
    const user_id = localStorage.getItem("id")
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
    const [isLoaded, setIsLoaded] = useState(false)
    const [changeAddress, setChangeAddress] = useState(false)
    const [newAddress, setNewAddress] = useState("")
    const [checkUser, setCheckUser] = useState(false)

    useEffect(() => {
        // Check if user_id and local storage id is the same. If same then allow user to proceed looking at the page. 
        if (user_id){
            const fetch = async () => {
                const response = await axios.get(baseUrl + "/api/users/edit/" + user_id)
                setName(response.data.name)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setPhone(response.data.contact_number)
                setDate(response.data.date_of_birth.slice(0, 10))
                setIsLoaded(true)
                setCheckUser(true)
            }
            fetch()
        } else { 
            setIsLoaded(true)
        }
        // eslint-disable-next-line
    }, [])

    if (isLoaded === false) {
        return (
            <div>Loading</div>
        )
    } else if (isLoaded === true && checkUser === false){
        return (
            <div>Unauthorised access</div> 
        )
    } else {
        return (
            <React.Fragment>
                <p>Editing Account {user_id}</p>

                <div>
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{date}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                    {/* <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="date" placeholder="Date of Birth" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <input type="number" placeholder="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                <input type="text" placeholder="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input> */}
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
                            } else {
                                const response = await axios.post(baseUrl + "/api/users/edit/" + user_id, {
                                    "password": password
                                })
                                if (response.data === "Password Updated") {
                                    history.push("/")
                                } else {
                                    console.log(response.data)
                                }
                            }
                        }
                    }>Update Password</button>
                </div>
                 <button onClick={
                    () => {
                        if (changeAddress === true) {
                            setChangeAddress(false)
                        } else {
                            setChangeAddress(true)
                        }
                    }
                }>Change Address</button>
                <div style={{
                    display: changeAddress === true ? "block" : "none"
                }}>
                    <input type="text" placeholder="New Address" name="newAddress" onChange={(e) => setNewAddress(e.target.value)}></input>
                    <button onClick={
                        async () => {
                            const response = await axios.post(baseUrl+"/api/users/edit/" + user_id,{
                                "address": newAddress
                            })
                            if (response.data === "Address Updated"){
                                history.push("/")
                            } else {
                                console.log(response.data)
                            }
                        }
                    }>Update Address</button>
                </div>


            </React.Fragment>

        )
    }
}
