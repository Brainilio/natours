import React, { useEffect, useState } from "react"
import "./Users.scss"
import * as actions from "../../../store/actions/"
import { connect } from "react-redux"
import Toggle from "../../../ui/Toggle/Toggle"
import DashboardBanner from "../../DashboardBanner/DashboardBanner"

const Users = (props) => {
	useEffect(() => {
		props.fetchUsers()
	}, [])

	let data = null

	if (props.users) {
		data = props.users.map((user) => (
			<tbody key={user._id}>
				<tr>
					<td>{user.name}</td>
					<td>{user.role}</td>
					<td>
						<label className="switch">
							<Toggle
								checked={user.active}
								handleChange={props.statuteUser}
								user={user._id}
							/>

							<span className="slider round"></span>
						</label>
					</td>
					<td>
						<span
							style={{ cursor: "pointer", color: "red", textAlign: "center" }}
							onClick={(event) => {
								event.preventDefault()
								props.deleteUser(user._id)
							}}
							aria-hidden
							className="material-icons "
						>
							delete
						</span>
					</td>
				</tr>
			</tbody>
		))
	}

	return (
		<>
			<DashboardBanner />
			<section className="admin-user-section">
				<table>
					<thead>
						<th>Name</th>
						<th>Role</th>
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users))
