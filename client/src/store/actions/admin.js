import * as actionTypes from "./actiontypes"
import axios from "../../axios"
import { fetchSingleTour, loadToursStart } from "./tours"

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

export const tourError = (error) => {
	return {
		type: actionTypes.ADD_TOUR_ERROR,
		error: error,
	}
}

export const tourDelete = (id) => {
	return {
		type: actionTypes.DELETE_TOUR,
		tour: id,
	}
}

export const closeModal = () => {
	return {
		type: actionTypes.CLOSE_MODAL,
	}
}

export const openModal = () => {
	return {
		type: actionTypes.OPEN_MODAL,
	}
}

export const tourEdit = (data, tour) => {
	return {
		type: actionTypes.EDIT_TOUR,
		data: data,
		tour: tour,
	}
}

export const stopLoading = () => {
	return {
		type: actionTypes.STOP_LOADING,
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
		dispatch(loadToursStart())
		const token = localStorage.getItem("token")
		let formdata = new FormData()

		for (const data in tour) {
			if (data === "startLocation") {
				for (const obj in tour[data]) {
					formdata.append(data, tour[data][obj])
				}
			}
			if (data == "images" && tour[data]) {
				for (const img of tour[data]) {
					formdata.append(data, img)
				}
			} else {
				formdata.append(data, tour[data])
			}
		}

		console.log(formdata)

		axios
			.post(`tours/`, formdata, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				dispatch(tourAdd(response.data.data.data))
				if (response.status === 201) {
					dispatch(closeModal())
				}
			})
			.catch((error) => {
				dispatch(tourError(error.response.data.messsage))
			})
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

export const editTour = (id, tour) => {
	return (dispatch) => {
		const token = localStorage.getItem("token")
		console.log(id, tour)
		axios
			.patch(`tours/${id}`, tour, {
				headers: { Authorization: token },
			})
			.then((response) => {
				console.log(response)
				dispatch(fetchSingleTour(id))
			})
			.catch((error) => console.log(error.response))
	}
}
