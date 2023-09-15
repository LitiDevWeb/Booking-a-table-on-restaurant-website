import React from "react"

export default class Nav extends React.Component {
    render() {
        if (this.props && this.props.isFooter === "true") {
            return (
                <nav>
                    <ul className="navLinks">
                        <li className="navLink"><a href="/">Home</a></li>
                        <li className="navLink"><a href="/#about">About</a></li>
                        <li className="navLink"><a href="/#specials">Menu</a></li>
                        <li className="navLink"><a href="/bookings">Reservations</a></li>
                        <li className="navLink"><a href="/order">Order Online</a></li>
                        <li className="navLink"><a href="/login">Login</a></li>
                    </ul>
                </nav>
            )
        } else {
            return (
                    <nav>
                        <a href="/" className="navLink"><span className="section-title">Home</span></a>
                        <a href="/#about" className="navLink"><span className="section-title">About</span></a>
                        <a href="/#specials" className="navLink"><span className="section-title">Menu</span></a>
                        <a href="/bookings" className="navLink"><span className="section-title">Reservations</span></a>
                        <a href="/order" className="navLink"><span className="section-title">Order Online</span></a>
                        <a href="/login" className="navLink"><span className="section-title">Login</span></a>
                    </nav>
            )
        }
    }
}