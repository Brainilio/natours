import React, { useState } from "react"
import Backdrop from "../../../ui/Backdrop/Backdrop"
import { NavLink } from "react-router-dom"
import "./Navbar.scss"

const Navbar = () => {
	const [showSideDrawer, setSideDrawer] = useState(false)

	const handleSideClicker = () => setSideDrawer((prevState) => !prevState)

	// sidedrawer classes
	let navSideDrawerClasses = ["nav-sidedrawer", "close"]

	if (showSideDrawer) {
		navSideDrawerClasses = ["nav-sidedrawer", "open"]
	}

	return (
		<>
			<nav>
				<div className="nav-title">
					<span>NATOURS</span>
				</div>

				<div className="hamburger-menu" onClick={handleSideClicker}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</nav>

			<Backdrop show={showSideDrawer} clicked={handleSideClicker} />
			<div
				onClick={handleSideClicker}
				className={navSideDrawerClasses.join(" ")}
			>
				<div className="side-top-content">
					{/* <div className="side-profile-user">
						<NavLink to="/login">
							<div className="side-profile-user-image"></div>
						</NavLink>
						<span className="side-profile-name">Safe travels, John</span>
					</div> */}

					<div className="side-login">
						<NavLink to="/login">
							<button className="side-login-button">Log in</button>
						</NavLink>

						<NavLink to="/login">
							<button className="side-signup-button">or Sign up</button>
						</NavLink>
					</div>

					<ul className="side-nav-items">
						<NavLink to="/#tours">
							<li className="tour-cta">Tours</li>
						</NavLink>

						<NavLink to="/#about-us">
							<li>About us</li>
						</NavLink>

						<NavLink to="/#our-team">
							<li>Our team</li>
						</NavLink>

						<NavLink to="/#contact">
							<li>Contact us</li>
						</NavLink>
					</ul>
				</div>

				<div className="side-bottom-content">
					<span className="side-bottom-content-logo">NATOURS</span>

					<div className="side-bottom-content-navigation-items">
						<span className="side-bottom-content-privacy">
							<NavLink to="/">PRIVACY </NavLink>
						</span>

						<span className="side-bottom-content-FAQ">
							<NavLink to="/">FAQ </NavLink>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
