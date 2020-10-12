import React from "react"
import { NavLink } from "react-router-dom"

const Landing = (props) => {
	return (
		<section className="detail-page-landing">
			<span className="go-back">
				<NavLink to="/">&lt;</NavLink>
			</span>
			<span className="detail-page-tour-name">{props.name}</span>
		</section>
	)
}

export default Landing
