import React, { useState } from "react"
import Backdrop from "../../../ui/Backdrop/Backdrop"
import { NavLink } from "react-router-dom"
import "./Navbar.scss"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux"

const Navbar = (props) => {
	const [showSideDrawer, setSideDrawer] = useState(false)

	const handleSideClicker = () => setSideDrawer((prevState) => !prevState)

	// sidedrawer classes
	let navSideDrawerClasses = ["nav-sidedrawer", "close"]

	if (showSideDrawer) {
		navSideDrawerClasses = ["nav-sidedrawer", "open"]
	}

	let authContent = (
		<div className="side-login">
			<NavLink to="/login">
				<button className="side-login-button">Log in</button>
			</NavLink>
			<NavLink to="/login">
				<button className="side-signup-button">Sign up</button>
			</NavLink>
		</div>
	)

	if (props.isAuthenticated)
		authContent = (
			<div className="side-profile-user">
				<NavLink to="/logout">Log out</NavLink>
				<NavLink to="/login">
					<img src={props.photo} className="side-profile-user-image" />
				</NavLink>
				<span className="side-profile-name">Safe travels, {props.name}</span>
			</div>
		)

	return (
		<>
			<nav>
				<div className="nav-title">
					<NavLink to="/">
						<span>NATOURS</span>
					</NavLink>
				</div>

				<div className="hamburger-menu" onClick={handleSideClicker}>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div className="nav-items">
					<ul>
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
					{authContent}
				</div>
			</nav>

			<Backdrop show={showSideDrawer} clicked={handleSideClicker} />
			<div
				onClick={handleSideClicker}
				className={navSideDrawerClasses.join(" ")}
			>
				<div className="side-top-content">
					{authContent}
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

const mapStateToProps = (state) => {
	return {
		name: state.auth.name,
		photo: state.auth.photo,
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogOut: () => dispatch(actions.authLogout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
