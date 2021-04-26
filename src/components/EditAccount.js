import React, { useState, useEffect } from "react"
import config from "../config"
import axios from "axios"
// import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl
export default function EditAccount() {
    const user_id = localStorage.getItem("id")
    // const history = useHistory();
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
    const [addressLength, setAddressLength] = useState(false)
    const [passwordShort, setPasswordShort] = useState(false)
    const [addressShort, setAddressShort] = useState(false)
    const [addressNotUpdated, setAddressNotUpdated] = useState(false)
    const [passwordNotUpdated, setPasswordNotUpdated] = useState(false)
    const [passwordUpdated, setPasswordUpdated] = useState(false)
    const [addressUpdated, setAddressUpdated] = useState(false)
    useEffect(() => {
        // Check if user_id and local storage id is the same. If same then allow user to proceed looking at the page. 
        if (user_id) {
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
            <img className="loading" src="https://ucarecdn.com/68a0fdc0-6074-4492-ba08-6ace1f689b6d/200.gif" alt="loading" />
        )
    } else if (isLoaded === true && checkUser === false) {
        return (
            <div>Unauthorised access</div>
        )
    } else {
        return (
            <React.Fragment>
                <div className="page-width">
                    <div className="login-wrapper">
                        <h1>Profile</h1>

                        <div>
                            <table className="table">
                                <tr>
                                    <td className="edit-row">Name: </td>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <td className="edit-row">Email: </td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td className="edit-row">Date of Birth: </td>
                                    <td>{date}</td>
                                </tr>
                                <tr>
                                    <td className="edit-row">Contact Number: </td>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <td className="edit-row">Address: </td>
                                    <td>{address}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="mb-2">
                            <button className="cta mb-3" onClick={
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
                                <input className="login-input" type="password" placeholder="New Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <input className="login-input" type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                <p className="warning-text" style={{ display: isPasswordSame === true ? "block" : "none" }}>*Password does not match. </p>
                                <p className="warning-text" style={{ display: passwordShort === true ? "block" : "none" }}>*Password is too short. </p>
                                <p className="warning-text" style={{ display: passwordNotUpdated === true ? "block" : "none" }}>*Password is not updated. Please try again later. </p>
                                <p className="warning-text" style={{ display: passwordUpdated === true ? "block" : "none" }}>*Password has been updated.</p>

                                <button className="cta" onClick={
                                    async () => {
                                        if (password !== confirmPassword) {
                                            setIsPasswordSame(true)
                                        } else if (password.length < 6) {
                                            setPasswordShort(true)
                                        } else {
                                            const response = await axios.post(baseUrl + "/api/users/edit/" + user_id, {
                                                "password": password
                                            })
                                            if (response.data === "Password Updated") {
                                                setIsPasswordSame(false)
                                                setPasswordShort(false)
                                                setPasswordNotUpdated(false)
                                                setPassword("")
                                                setConfirmPassword("")
                                                setTimeout(() => {
                                                    setPasswordUpdated(true)
                                                }, 2000)
                                            } else {
                                                setPasswordNotUpdated(true)
                                            }
                                        }
                                    }
                                }>Update Password</button>
                            </div>
                        </div>
                        <div>
                            <button className="cta mb-3" onClick={
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
                                <input className="login-input" type="text" placeholder="New Address" name="newAddress" value={newAddress} onChange={(e) => setNewAddress(e.target.value)}></input>
                                <p className="warning-text" style={{ display: addressLength === true ? "block" : "none" }}>*Address is too long. Length must be shorter than 255 characters.</p>
                                <p className="warning-text" style={{ display: addressShort === true ? "block" : "none" }}>*Address is too short. Length must be longer than 10 characters.</p>
                                <p className="warning-text" style={{ display: addressNotUpdated === true ? "block" : "none" }}>*Address cannot be updated. Please try again later.</p>
                                <p className="warning-text" style={{ display: addressUpdated === true ? "block" : "none" }}>*Address has been updated.</p>

                                <button className="cta" onClick={
                                    async () => {
                                        if (newAddress.length > 255) {
                                            setAddressLength(true)
                                        } else if (newAddress.length < 10) {
                                            setAddressShort(true)
                                        } else {
                                            const response = await axios.post(baseUrl + "/api/users/edit/" + user_id, {
                                                "address": newAddress
                                            })
                                            if (response.data === "Address Updated") {
                                                setAddressLength(false)
                                                setAddressShort(false)
                                                setAddressNotUpdated(false)
                                                setAddress(newAddress)
                                                setNewAddress("")

                                                setTimeout(()=>{
                                                    setAddressUpdated(true)
                                                }, 2000)
                                            } else {
                                                setAddressNotUpdated(true)
                                            }
                                        }
                                    }
                                }>Update Address</button>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>

        )
    }
}
