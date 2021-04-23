import React from "react";
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <React.Fragment>
        <div className="home-hero-img">
            <div className="hero-wrapper">
                <h2 className="hero-text">Welcome to Tea Empire</h2>
                <Link className="cta" to="/products"> see all teas</Link>
            </div>
        </div>
    </React.Fragment>
  );
}