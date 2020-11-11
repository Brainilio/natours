import * as actionTypes from "../actions/actiontypes"

const initialState = {
	error: null,
	users: null,
	loading: false,
}

const fetchStart = (state, action) => {
	return { ...state, loading: true, error: null }
}

const fetchSuccess = (state, action) => {
	console.log(action.users)
	let freshUsers = action.users.filter((user) => user.role !== "admin")
	return { ...state, loading: false, users: freshUsers }
}

const fetchFail = (state, action) => {
	return { ...state, error: action.error }
}

// TODO: set up all these actions

const deleteUser = (state, action) => {
	let currentUsers = [...state.users]
	let users = currentUsers.filter((user) => user._id !== action.user)
	return { ...state, users: users }
}

const editUser = (state, action) => {
	return { ...state }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_USERS_START:
			return fetchStart(state, action)
		case actionTypes.LOAD_USERS_SUCCESS:
			return fetchSuccess(state, action)
		case actionTypes.LOAD_USERS_FAIL:
			return fetchFail(state, action)
		case actionTypes.DELETE_USER:
			return deleteUser(state, action)
		case actionTypes.EDIT_USER:
			return editUser(state, action)

		default:
			return state
	}
}

export default reducer
