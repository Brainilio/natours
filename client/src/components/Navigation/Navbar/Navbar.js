import React, { useState } from "react"
import Backdrop from "../../../ui/Backdrop/Backdrop"
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
			<div className={navSideDrawerClasses.join(" ")}></div>
		</>
	)
}

export default Navbar
