import * as actionTypes from "./actiontypes"
import axios from "../../axios"
import { fetchSingleTour } from "./tours"

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

export const tourDelete = (id) => {
	return {
		type: actionTypes.DELETE_TOUR,
		tour: id,
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
		const token = localStorage.getItem("token")

		console.log("deleting .." + id)
		dispatch(userDelete(id))
		axios
			.delete(`users/${id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
	}
}

export const addTour = (tour) => {
	return (dispatch) => {
		const token = localStorage.getItem("token")
		let formdata = new FormData()

		for (const data in tour) {
			if (data === "startLocation") {
				for (const obj in tour[data]) {
					formdata.append(data, tour[data][obj])
				}
			}
			if (data === "images" && data.length > 1) {
				for (const img of tour[data]) {
					formdata.append(data, img)
				}
			} else {
				formdata.append(data, tour[data])
			}
		}

		axios
			.post(`tours/`, formdata, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response)
				dispatch(tourAdd(response.data.data.data))
			})
			.catch((error) => console.log(error))
	}
}

export const deleteTour = (id) => {
	return (dispatch) => {
		const token = localStorage.getItem("token")
		axios
			.delete(`tours/${id}`, { headers: { Authorization: token } })
			.then((response) => {
				dispatch(tourDelete(id))
				console.log(response)
			})
			.catch((error) => console.log(error))
	}
}

export const editTour = (id, data) => {
	return (dispatch) => {
		console.log(
			`Editing tour with id of ${id} with the following data: ${data}`
		)
		const token = localStorage.getItem("token")
		axios
			.patch(`tours/${id}`, { headers: { Authorization: token } }, data)
			.then((response) => {
				dispatch(fetchSingleTour())
			})
			.catch((error) => console.log(error))
	}
}
