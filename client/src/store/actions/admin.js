import * as actionTypes from "./actiontypes"
import axios from "../../axios"

const settings = {
	headers: {
		Authorization: localStorage.getItem("token"),
	},
}

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

export const userEdit = (data) => {
	return {
		type: actionTypes.EDIT_USER,
		data: data,
	}
}

export const userStatute = (status) => {
	return {
		type: actionTypes.STATUTE_USER,
		status: status,
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

export const tourEdit = (data) => {
	return {
		type: actionTypes.EDIT_TOUR,
		data: data,
	}
}

export const fetchUsers = () => {
	return (dispatch) => {
		dispatch(loadUsersStart())
		axios
			.get("users", settings)
			.then((response) => {
				dispatch(loadUsersSuccess(response.data.data.doc))
			})
			.catch((error) => dispatch(loadUsersFail(error)))
	}
}

// TODO: IMPLEMENT ACTIONS

export const editUser = (data) => {
	return (dispatch) => {}
}

export const statuteUser = (status) => {
	return (dispatch) => {}
}

export const deleteUser = (user) => {
	return (dispatch) => {}
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
