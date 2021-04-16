import React, { useState } from "react";
import axios from "axios"
import config from "./config"
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
    const [isPasswordSame, setIsPasswordSame] = useState(false)


    return (
        <React.Fragment>
            <h4>Create Account</h4>
            <div>
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <input type="date" placeholder="Date of Birth" name="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <input type="number" placeholder="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                <input type="text" placeholder="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <p style={{ display: isPasswordSame === true ? "block" : "none" }}>Password is not the same!! </p>
            <button onClick={
                async () => {
                    // Validation on react can use flag and conditional rendering for error sentences

                    // Check if confirm password and password is the same 
                    if (password !== confirmPassword) {
                        setIsPasswordSame(true)
                    } else {
                        // Send data to url
                        const response = await axios.post(baseUrl + "/api/users/register", {
                            "name": name,
                            "email": email,
                            "password": password,
                            "address": address,
                            "contact_number": phone,
                            "date_of_birth": date
                        })
                        if (response.data === "Ok"){
                            history.goBack("/")
                        } else {
                            console.log(response.data)
                        }

                    }

                }
            }>Submit</button>
        </React.Fragment>
    );
}