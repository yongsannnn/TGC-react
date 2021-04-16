import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react"
import Login from "./pages/Login"
import Education from "./pages/Education";
import Product from "./pages/Product";
import Landing from "./pages/Landing";


function App() {
    return (
        <React.Fragment>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light " style={{ padding: "0rem 2rem" }}>
                    <Link className="navbar-brand" to="/">
                        TEE GEE SEE
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/products">Teas</Link>
                            <Link className="nav-item nav-link" to="/education">Education</Link>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <Link className="nav-item nav-link ml-auto" to="/login">Log In</Link>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Landing/>
                    </Route>
                    <Route exact path="/products">
                        <Product/>
                    </Route>
                    <Route exact path="/education">
                        <Education/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
