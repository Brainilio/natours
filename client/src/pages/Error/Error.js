import React from "react"
import { NavLink } from "react-router-dom"
import "./Error.scss"

const Error = () => {
	return (
		<section className="error-page">
			<span className="error-page-title">
				Sorry, I couldn’t find this page.
			</span>
			<NavLink to="/">
				<button className="error-page-button">BACK HOME</button>
			</NavLink>
		</section>
	)
}

export default Error
