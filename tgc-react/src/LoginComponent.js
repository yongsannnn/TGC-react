import React, { useContext, useState } from "react"
import axios from "axios"
import config from "./config"
import { useHistory } from "react-router-dom"
import LoginContext from "./LoginContext"
import { Link } from "react-router-dom";

const baseUrl = config.baseUrl

export default function LoginComponent() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let context = useContext(LoginContext)


    return (
        <React.Fragment>
            <div>
                <label>Email</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={
                    async () => {
                        const response = await axios.post(baseUrl + "/api/users/login", {
                            "email": email,
                            "password": password
                        })
                        localStorage.setItem("accessToken", response.data.accessToken)
                        localStorage.setItem("refreshToken", response.data.refreshToken)
                        console.log(localStorage)
                        context.changeLogin()
                        history.push("/")
                    }
                }>Log In</button>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
        </React.Fragment>
    );
}