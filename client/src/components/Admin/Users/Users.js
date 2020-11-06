import React, { useEffect } from "react"
import "./Users.scss"
import { NavLink } from "react-router-dom"
import person from "../../../resource/person.jpg"
import * as actions from "../../../store/actions/"
import { connect } from "react-redux"

const Users = (props) => {
	useEffect(() => {
		props.fetchUsers()
	}, [])

	let data = null
	if (props.users) {
		data = props.users.map((user) => (
			<>
				<tr>
					<th>{user._id}</th>
					<th>{user.name}</th>
					<th>{user.role}</th>
					<th>Add function here</th>
					<th>Add toggle here</th>
					<th>Add function here</th>
				</tr>
			</>
		))
	}

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
					<th>Role</th>
					<th>Update</th>
					<th>Status</th>
					<th>Delete</th>
				</tr>
				{data}
			</table>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.admin.users,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(actions.fetchUsers()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users))
