import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react"
import Login from "./components/Login"
import Education from "./components/Education";
import Product from "./components/Product";
import Landing from "./components/Landing";
import LoginContext from "./components/LoginContext";
import CreateAccount from "./components/CreateAccount";
import EditAccount from "./components/EditAccount";
import IndividualProduct from "./components/IndividualProduct"
import Cart from "./components/Cart"
import Order from "./components/Order" 
import IndividualOrder from "./components/IndividualOrder"
import config from "./config"
import axios from "axios";

const baseUrl = config.baseUrl

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(0)

    // Check if there is token in local storage
    const isToken = localStorage.getItem("accessToken")
    if (isToken){
    const checkToken = async () => {
            // If token is there, check if still valid. 
            const response = await axios.get(baseUrl + "/api/users/profile", 
            {
                headers: {
                    authorization: "Bearer " + isToken
                }
            }
            )
            setUserId(response.data.id)
            // Check if the id stored and returning access token is the same person
            if (userId === parseInt(localStorage.getItem("id"))){
                // If valid, set user loggedIn to true
                setLoggedIn(true)
            } 
            // Else loggedIn is already false
        }
    checkToken()
    }
    const context = {
        checkLogin: () => {
            return loggedIn
        },
        changeUser: (id) => {
            setUserId(id)
        },
        changeLogin: () => {
            if (loggedIn === false) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        }
    }

    return (
        <React.Fragment>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light " style={{ padding: "0rem 2rem" }}>
                    <Link className="navbar-brand" to="/">
                        TEE GEE SEE
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/products">Teas</Link>
                            <Link className="nav-item nav-link" to="/education">Education</Link>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-item nav-link ml-auto" style={{
                                display: loggedIn === false ? "block" : "none"
                            }} to="/login">Log In</Link>
                            <Link className="nav-item nav-link ml-auto" style={{
                                display: loggedIn === true ? "block" : "none"
                            }} to={"/cart"}>Cart</Link>
                             <Link className="nav-item nav-link ml-auto" style={{
                                display: loggedIn === true ? "block" : "none"
                            }} to={"/order"}>Orders</Link>
                            <Link className="nav-item nav-link ml-auto" style={{
                                display: loggedIn === true ? "block" : "none"
                            }} to={"/edit/"}>Edit</Link>
                            <Link className="nav-item nav-link ml-auto" style={{
                                display: loggedIn === true ? "block" : "none"
                            }} to="/" onClick={
                                async () => {
                                    localStorage.clear()
                                    setLoggedIn(false)
                                }
                            }>Log Out</Link>
                        </div>
                    </div>
                </nav>
                <section style={{ padding: "0rem 2rem" }}>
                    <Switch>
                        <Route exact path="/">
                            <Landing />
                        </Route>
                        <Route exact path="/products">
                            <Product />
                        </Route>
                        <Route exact path="/education">
                            <Education />
                        </Route>
                        <Route exact path="/login">
                            <LoginContext.Provider value={context}>
                                <Login />
                            </LoginContext.Provider>
                        </Route>
                        <Route exact path="/register">
                            <LoginContext.Provider value={context}>
                                <CreateAccount />
                            </LoginContext.Provider>
                        </Route>
                        <Route exact path="/edit">
                            <EditAccount />
                        </Route>
                        <Route exact path="/products/:tea_id">
                            <IndividualProduct />
                        </Route>
                        <Route exact path="/cart">
                            <Cart/>
                        </Route> 
                        <Route exact path="/order">
                            <Order />
                        </Route> 
                        <Route exact path="/order/:order_id">
                            <IndividualOrder />
                        </Route> 
                    </Switch>
                </section>
            </Router>

        </React.Fragment>
    );
}

export default App;
