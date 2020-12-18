import * as actionTypes from "../actions/actiontypes"

const initialState = {
	token: null,
	userId: null,
	fullUser: null,
	name: null,
	role: null,
	loading: false,
	photo: null,
	error: null,
	redirect: false,
	reviews: null,
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
		name: action.name,
		email: action.email,
		role: action.role,
		photo: action.photo,
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
	return { ...state, token: null, userId: null, name: null }
}

//change profile
const authEdit = (state, action) => {
	console.log(action.newData)
	return { ...state }
}

// TODO: implement reducer methods

//pull reviews
const getReviews = (state, action) => {
	return { ...state }
}

//delete reviews
const deleteReview = (state, action) => {
	return { ...state }
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
		case actionTypes.AUTH_EDIT:
			return authEdit(state, action)
		case actionTypes.GET_REVIEW:
			return getReviews(state, action)
		case actionTypes.DELETE_REVIEW:
			return deleteReview(state, action)
		default:
			return state
	}
}

export default reducer
