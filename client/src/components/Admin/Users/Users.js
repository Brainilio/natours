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
				<tr key={user._id}>
					<td>{user._id}</td>
					<td>{user.name}</td>
					<td>{user.role}</td>
					<td>Add function here</td>
					<td>{user.active ? "active" : "not active"}</td>
					<td>Add function here</td>
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
				<thead>
					<th>ID</th>
					<th>Name</th>
					<th>Role</th>
					<th>Update</th>
					<th>Status</th>
					<th>Delete</th>
				</thead>
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
