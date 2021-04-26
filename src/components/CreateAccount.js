import React, { useState } from "react";
import axios from "axios"
import config from "../config"
import { useHistory } from "react-router-dom"

const baseUrl = config.baseUrl

export default function CreateAccount() {
    const history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [date, setDate] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [isPasswordShort, setIsPasswordShort] = useState(false)
    const [isPasswordSame, setIsPasswordSame] = useState(false)
    const [isNameLong, setIsNameLong] = useState(false)
    const [isNameShort, setIsNameShort] = useState(false)
    const [isEmailFormat, setIsEmailFormat] = useState(false)
    const [isDOBEmpty, setIsDOBEmpty] = useState(false)
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(false)
    const [isAddressShort, setIsAddressShort] = useState(false)
    const [addressLength, setAddressLength] = useState(false)
    const [registerError, setRegisterError] = useState(false)

    function validateEmail(email) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);

    }

    return (
        <React.Fragment>
            <div className="page-width">
                <div className="login-wrapper">
                    <h1>Create Account</h1>
                    <div>
                        <input type="text" className="login-input" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="text" className="login-input" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" className="login-input" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="password" className="login-input" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        <input type="date" className="login-input" placeholder="Date of Birth" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                        <input type="number" className="login-input" placeholder="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                        <input type="text" className="login-input" placeholder="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </div>
                    <p className="warning-text" style={{ display: isNameLong === true ? "block" : "none" }}>*Name is too long. Length must be shorter than 45 characters. </p>
                    <p className="warning-text" style={{ display: isNameShort === true ? "block" : "none" }}>*Name is too short. Length must be at least 3 characters. </p>
                    <p className="warning-text" style={{ display: isEmailFormat === true ? "block" : "none" }}>*Invalid Email format.</p>
                    <p className="warning-text" style={{ display: isPasswordShort === true ? "block" : "none" }}>*Password is too short. </p>
                    <p className="warning-text" style={{ display: isPasswordSame === true ? "block" : "none" }}>*Password does not match. </p>
                    <p className="warning-text" style={{ display: isDOBEmpty === true ? "block" : "none" }}>*Date Of Birth is empty. </p>
                    <p className="warning-text" style={{ display: isPhoneEmpty === true ? "block" : "none" }}>*Phone Number is empty. </p>
                    <p className="warning-text" style={{ display: addressLength === true ? "block" : "none" }}>*Address is too long. Length must be shorter than 255 characters. </p>
                    <p className="warning-text" style={{ display: isAddressShort === true ? "block" : "none" }}>*Address is too short. Length must be at least 10 characters. </p>



                    <div className="login-btn-wrapper">
                        <button className="cta" onClick={
                            async () => {
                                // Validation on react using flag and conditional rendering for error sentences
                                if (name.length > 45) {
                                    setIsNameLong(true)
                                } else {
                                    setIsNameLong(false)
                                }
                                if (name.length < 3) {
                                    setIsNameShort(true)
                                } else {
                                    setIsNameShort(false)
                                }

                                if (password.length < 6){
                                    setIsPasswordShort(true)
                                } else {
                                    setIsPasswordShort(false)
                                }

                                if (validateEmail(email) === false) {
                                    setIsEmailFormat(true)
                                } else {
                                    setIsEmailFormat(false)
                                }
                                if (password !== confirmPassword) {
                                    setIsPasswordSame(true)
                                } else {
                                    setIsPasswordSame(false)
                                }

                                if (!date) {
                                    setIsDOBEmpty(true)
                                } else {
                                    setIsDOBEmpty(false)
                                }

                                if (!phone) {
                                    setIsPhoneEmpty(true)
                                } else {
                                    setIsPhoneEmpty(false)
                                }
                                if (address.length > 255) {
                                    setAddressLength(true)
                                } else {
                                    setAddressLength(false)
                                }
                                if (address.length < 10) {
                                    setIsAddressShort(true)
                                } else {
                                    setIsAddressShort(false)
                                }

                                if (isNameLong === false && isEmailFormat === false && isPasswordSame === false && isDOBEmpty === false && isPhoneEmpty === false && addressLength === false && isNameShort === false && isAddressShort === false && isPasswordShort === false) {
                                    // Send data to url when all flag is false
                                    const response = await axios.post(baseUrl + "/api/users/register", {
                                        "name": name,
                                        "email": email,
                                        "password": password,
                                        "address": address,
                                        "contact_number": phone,
                                        "date_of_birth": date
                                    })
                                    if (response.data !== "Unable to create user") {
                                        history.goBack("/")
                                    } else {
                                        setRegisterError(true)
                                        console.log(response.data)
                                    }
                                }
                            }
                        }>Submit</button>

                    </div>
                    <p className="warning-text" style={{ display: registerError === true ? "block" : "none" }}>*Unable to create account. Check error messages or try again later. </p>
                </div>

            </div>
        </React.Fragment>
    );
}