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
	return { ...state, loading: false, users: action.users }
}

const fetchFail = (state, action) => {
	return { ...state, error: action.error }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_USERS_START:
			return fetchStart(state, action)
		case actionTypes.LOAD_USERS_SUCCESS:
			return fetchSuccess(state, action)
		case actionTypes.LOAD_USERS_FAIL:
			return fetchFail(state, action)
		default:
			return state
	}
}

export default reducer
