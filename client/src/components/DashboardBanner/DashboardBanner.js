import React from "react"
import { NavLink } from "react-router-dom"
import person from "../../resource/person.jpg"
import * as actions from "../../store/actions"
import { connect } from "react-redux"

const DashboardBanner = (props) => {
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
				<img src={props.photo} />
				<span>Hi, Christian!</span>
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		photo: state.auth.photo,
	}
}

export default connect(mapStateToProps, null)(DashboardBanner)
