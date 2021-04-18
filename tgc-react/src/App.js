import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react"
import Login from "./pages/Login"
import Education from "./pages/Education";
import Product from "./pages/Product";
import Landing from "./pages/Landing";
import LoginContext from "./LoginContext";
import CreateAccount from "./CreateAccount";
import EditAccount from "./EditAccount";
// import ProductContext from "./ProductContext"
// import {useHistory} from "react-router-dom"


function App() {
    // const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(0)
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
                            }} to={"edit/" + userId}>Edit Profile</Link>
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
                        <Route exact path="/edit/:user_id">
                            <EditAccount />
                        </Route>
                    </Switch>
                </section>
            </Router>

        </React.Fragment>
    );
}

export default App;
