import * as actionTypes from "../actions/actiontypes"

const initialState = {
	token: null,
	userId: null,
	loading: false,
	error: null,
	redirect: false,
}

//method for starting auth, loader.
const authStart = (state, action) => {
	return { ...state, loading: true, error: null }
}

//auth success
const authSuccess = (state, action) => {
	return {
		...state,
		token: action.token,
		userId: action.userId,
		error: null,
		loading: false,
	}
}

//fail auth
const authFail = (state, action) => {
	return { ...state, error: action.error, loading: false }
}

//auth logout
const authLogout = (state, action) => {
	return { ...state, token: null, userId: null }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action)
		case actionTypes.AUTH_FAIL:
			return authFail(state, action)
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)

		default:
			return state
	}
}

export default reducer
