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

export const fetchUsers = () => {
	return (dispatch) => {
		dispatch(loadUsersStart())
		axios
			.get("users", settings)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => loadUsersFail(error))
	}
}
