import React, { useContext, useState } from "react"
import axios from "axios"
import config from "../config"
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
            <div className="page-width">
                <div className="login-wrapper">
                    <div>
                        <h1>
                            Log In
                         </h1>
                        <div>
                            <input className="login-input" type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                            <input className="login-input" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                            
                            <div className="login-btn-wrapper">
                                <button className="cta" onClick={
                                    async () => {
                                        const response = await axios.post(baseUrl + "/api/users/login", {
                                            "email": email,
                                            "password": password
                                        })
                                        localStorage.setItem("accessToken", response.data.accessToken)
                                        localStorage.setItem("refreshToken", response.data.refreshToken)
                                        localStorage.setItem("id", response.data.id)
                                        context.changeLogin()
                                        context.changeUser(response.data.id)
                                        history.goBack("/")
                                    }
                                }>Sign In</button>
                            </div>
                        </div>
                        <div>
                            <Link className="create-acc" to="/register">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}