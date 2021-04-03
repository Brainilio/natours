import React from "react"
import { NavLink } from "react-router-dom"

const Landing = (props) => {
	const styles = {
		background: `url(${props.background}) center/cover`,
	}
	return (
		<section className="detail-page-landing" style={styles}>
			<span className="go-back">
				<NavLink to="/">&lt;</NavLink>
			</span>
			<span className="detail-page-tour-name">{props.name}</span>
		</section>
	)
}

export default Landing
