import React from "react"
import { NavLink } from "react-router-dom"
import person from "../../resource/person.jpg"

const DashboardBanner = () => {
	return (
		<section className="dashboard-page">
			<div className="dashboard-actions">
				<ul>
					<NavLink to="/dashboard">
						<li>&lt;</li>
					</NavLink>
				</ul>
			</div>
			<div className="dashboard-user">
				<img src={person} />
				<span>Hi, Christian!</span>
			</div>
		</section>
	)
}

export default DashboardBanner
