import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer">
                <section className="footer-left">
                    <p className="footer-header">quick links</p>
                    <ul className="footer-list">
                        <li className="footer-link"><Link className="footer-link-cta" to="/products">All Teas</Link></li>
                        {/* <li className="footer-link"><Link className="footer-link-cta" to="/education">Education</Link></li> */}
                    </ul>
                </section>
                <section className="footer-center">
                    <p className="footer-header">download our app</p>
                    <ul className="footer-list">
                        <li className="footer-link"><a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="footer-link-cta">Google Play Store</a></li>
                        <li className="footer-link"><a href="https://www.apple.com/sg/app-store/" target="_blank" rel="noreferrer" className="footer-link-cta">Apple App Store</a></li>
                    </ul>
                </section>
                <section className="footer-right">
                    <p className="footer-header">contact</p>
                    <ul className="footer-list">
                        <li className="footer-link"><p className="footer-text">SG: 6888 8888 | 8123 8123</p></li>
                        <li className="footer-link"><p className="footer-text" style={{
                            fontSize: "0.8em"
                        }}>© All rights reserved</p></li>
                    </ul>
                </section>
            </div>

        </div>
    )
}