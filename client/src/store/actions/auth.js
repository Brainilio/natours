import * as actionTypes from "./actiontypes"
import axios from "../../axios"

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token, userId, name) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
		name: name,
	}
}

export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
	}
}

export const authLogout = () => {
	localStorage.clear()
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeOut = (expiresIn) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(authLogout())
		}, expiresIn * 1000)
	}
}

export const auth = (userData, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart())

		userData = {
			name: "Brainilio",
			...userData,
		}

		console.log(userData)
		let url = "users/login"
		if (isSignUp) url = "users/signup"

		axios
			.post(url, userData)
			.then((response) => {
				let name = response.data.data.user.name
				let token = response.data.token
				let userId = response.data.data.user._id
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000)

				localStorage.setItem("token", token)
				localStorage.setItem("userid", userId)
				localStorage.setItem("expirationDate", expirationDate)

				dispatch(checkAuthTimeOut(3600))
				dispatch(authSuccess(token, userId, name))
			})
			.catch((error) => dispatch(authFailed(error)))
	}
}

// checking auth state
export const checkAuth = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token")
		if (!token) dispatch(authLogout())
		else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"))
			if (expirationDate < new Date()) dispatch(authLogout())
			else {
				const userId = localStorage.getItem("userid")
				dispatch(authSuccess(token, userId))
				dispatch(
					checkAuthTimeOut(
						expirationDate.getTime() - new Date().getTime() / 1000
					)
				)
			}
		}
	}
}
