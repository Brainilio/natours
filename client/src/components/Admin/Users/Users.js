import React, { useEffect, useState } from "react"
import "./Users.scss"
import { NavLink } from "react-router-dom"
import person from "../../../resource/person.jpg"
import * as actions from "../../../store/actions/"
import { connect } from "react-redux"
import Toggle from "../../../ui/Toggle/Toggle"

const Users = (props) => {
	useEffect(() => {
		props.fetchUsers()
	}, [])

	let [active, setActive] = useState()

	let data = null

	if (props.users) {
		data = props.users.map((user) => (
			<>
				<tr key={user._id}>
					<td>{user.name}</td>
					<td>{user.role}</td>
					<td>
						<button
							onClick={() => props.editUser({ name: "newname" }, user._id)}
						>
							Edit user
						</button>
					</td>
					<td>
						<label class="switch">
							<Toggle
								checked={user.active}
								handleChange={props.statuteUser}
								user={user._id}
							/>

							<span class="slider round"></span>
						</label>
					</td>
					<td>
						<button
							onClick={(event) => {
								event.preventDefault()
								props.deleteUser(user._id)
							}}
						>
							Delete user
						</button>
					</td>
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
			<section className="admin-user-section">
				<table>
					<thead>
						<th>Name</th>
						<th>Role</th>
						<th>Update</th>
						<th>Status</th>
						<th>Delete</th>
					</thead>
					{data}
				</table>
			</section>
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
		deleteUser: (id) => dispatch(actions.deleteUser(id)),
		statuteUser: (status, user) => dispatch(actions.statuteUser(status, user)),
		editUser: (data, user) => dispatch(actions.editUser(data, user)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users))
