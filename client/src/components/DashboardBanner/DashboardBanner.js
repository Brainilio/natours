import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const DashboardBanner = () => {
	const { name, photo } = useSelector((state) => state.auth)

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
				<img src={photo} />
				<span>Hi, {name}!</span>
			</div>
		</section>
	)
}

export default DashboardBanner
