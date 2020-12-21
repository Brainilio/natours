import * as actionTypes from "./actiontypes"
import axios from "../../axios"
import ax from "axios"

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token, userId, name, email, role, photo) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
		email: email,
		name: name,
		role: role,
		photo: photo,
	}
}

export const authEdit = (newData) => {
	return {
		type: actionTypes.AUTH_EDIT,
		newData: newData,
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
				let email = response.data.data.user.email
				let token = response.data.token
				let role = response.data.data.user.role
				let userId = response.data.data.user._id
				let photo = response.data.data.user.photo

				console.log(photo)

				const expirationDate = new Date(new Date().getTime() + 3600 * 1000)

				localStorage.setItem("token", token)
				localStorage.setItem("userid", userId)
				localStorage.setItem("expirationDate", expirationDate)
				localStorage.setItem("email", email)
				localStorage.setItem("role", role)
				localStorage.setItem("name", name)
				localStorage.setItem("photo", photo)

				dispatch(checkAuthTimeOut(3600))
				dispatch(authSuccess(token, userId, name, email, role, photo))
			})
			.catch((error) => dispatch(authFailed(error)))
	}
}

//edit profile

export const authChangeProfile = (userdata) => {
	return (dispatch) => {
		if (
			userdata.password &&
			userdata.currentPassword &&
			userdata.passwordConfirm
		) {
			// perform password change
			console.log("changing password...")

			let data = {}

			data.currentPassword = userdata.currentPassword
			data.newPassword = userdata.password
			data.newPasswordConfirm = userdata.passwordConfirm

			console.log(data)

			axios
				.patch("users/updatePassword", data, {
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log(response)
					dispatch(authLogout())
				})
				.catch((error) => console.log(error))
		} else {
			const data = new FormData()

			// fix problem here that you send empty field
			data.append("name", userdata.name)
			data.append("email", userdata.email)
			data.append("photo", userdata.image)

			// console.log(data)

			axios
				.patch("users/updateProfile", data, {
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				})
				.then((response) => dispatch(authEdit(response)))
				.catch((error) => console.log(error))
		}
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
				const role = localStorage.getItem("role")
				const email = localStorage.getItem("email")
				const name = localStorage.getItem("name")
				const photo = localStorage.getItem("photo")

				dispatch(authSuccess(token, userId, name, email, role, photo))
				dispatch(
					checkAuthTimeOut(
						expirationDate.getTime() - new Date().getTime() / 1000
					)
				)
			}
		}
	}
}
