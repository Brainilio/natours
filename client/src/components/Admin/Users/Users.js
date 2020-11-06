import React from "react"
import "./Users.scss"
import { NavLink } from "react-router-dom"
import person from "../../../resource/person.jpg"
import * as actions from "../../../store/actions/"
import { connect } from "react-redux"

const Users = () => {
	return (
		<>
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
			<table>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Update</th>
					<th>Status</th>
					<th>Delete</th>
				</tr>
			</table>
		</>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
