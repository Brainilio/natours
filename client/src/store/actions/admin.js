import * as actionTypes from "./actiontypes"
import axios from "../../axios"

export const loadUsersStart = () => {
	return {
		type: actionTypes.LOAD_USERS_START,
	}
}

export const loadUsersSuccess = (users) => {
	return {
		type: actionTypes.LOAD_USERS_SUCCESS,
		users: users,
	}
}

export const loadUsersFail = (error) => {
	return {
		type: actionTypes.LOAD_USERS_FAIL,
		error: error,
	}
}

export const userEdit = (data, user) => {
	return {
		type: actionTypes.EDIT_USER,
		data: data,
		user: user,
	}
}

export const userDelete = (user) => {
	return {
		type: actionTypes.DELETE_USER,
		user: user,
	}
}

export const tourAdd = (tour) => {
	return {
		type: actionTypes.ADD_TOUR,
		tour: tour,
	}
}

export const tourDelete = (tour) => {
	return {
		type: actionTypes.DELETE_TOUR,
		tour: tour,
	}
}

export const tourEdit = (data, tour) => {
	return {
		type: actionTypes.EDIT_TOUR,
		data: data,
		tour: tour,
	}
}

export const fetchUsers = () => {
	return (dispatch) => {
		dispatch(loadUsersStart())
		const token = localStorage.getItem("token")

		const settings = {
			headers: {
				Authorization: token,
			},
		}
		console.log(settings)
		axios
			.get("users", settings)
			.then((response) => {
				dispatch(loadUsersSuccess(response.data.data.doc))
			})
			.catch((error) => dispatch(loadUsersFail(error)))
	}
}

// TODO: IMPLEMENT ACTIONS

export const editUser = (data, user) => {
	return (dispatch) => {
		console.log(`Editing ${user} with the following data: ${data}`)
	}
}

export const statuteUser = (status, user) => {
	return (dispatch) => {
		// PATCH /users/userid , active: status

		const token = localStorage.getItem("token")
		axios
			.patch(
				`users/${user}`,
				{
					active: status,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
		console.log("switching " + user + " status to " + status)
	}
}

export const deleteUser = (id) => {
	return (dispatch) => {
		console.log("deleting .." + id)
	}
}

export const addTour = (tour) => {
	return (dispatch) => {}
}

export const deleteTour = (tour) => {
	return (dispatch) => {}
}

export const editTour = (data) => {
	return (dispatch) => {}
}
