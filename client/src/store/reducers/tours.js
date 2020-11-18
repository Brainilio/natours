import { fetchTours } from "../actions"
import * as actionTypes from "../actions/actiontypes"

const initialState = {
	loadTours: false,
	allTours: null,
	currentTour: null,
	currentReviews: null,
	loadCurrentTour: false,
	loadBooking: false,
	isBooking: false,
	error: null,
}

// all tours loading

const loadToursStart = (state, action) => {
	return { ...state, loadTours: true }
}

const loadToursSuccess = (state, action) => {
	return {
		...state,
		loadTours: false,
		allTours: action.tours,
	}
}

const loadTourFailed = (state, action) => {
	return { ...state, loadTours: false, error: action.error }
}

// single tour loading

const loadSingleTourStart = (state, action) => {
	return { ...state }
}

const loadSingleTourSuccess = (state, action) => {
	return {
		...state,
		loadCurrentTour: false,
		currentTour: action.tour,
		currentReviews: action.reviews,
	}
}

const loadSingleTourFailed = (state, action) => {
	return { ...state, loadCurrentTour: false, error: action.error }
}

const newReview = (state, action) => {
	let reviews = [...state.currentReviews]
	reviews.push(action.review)

	console.log("Going to add..." + action.review)

	return { ...state, currentReviews: reviews }
}

// TODO: set up all these actions

const addTour = (state, action) => {
	return { ...state }
}

const deleteTour = (state, action) => {
	return { ...state }
}

const editTour = (state, action) => {
	return { ...state }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_TOURS_START:
			return loadToursStart(state, action)
		case actionTypes.LOAD_TOURS_SUCCESS:
			return loadToursSuccess(state, action)
		case actionTypes.LOAD_TOURS_FAIL:
			return loadTourFailed(state, action)
		case actionTypes.LOAD_SINGLE_TOUR_START:
			return loadSingleTourStart(state, action)
		case actionTypes.LOAD_SINGLE_TOUR_SUCCESS:
			return loadSingleTourSuccess(state, action)
		case actionTypes.LOAD_SINGLE_TOUR_FAIL:
			return loadSingleTourFailed(state, action)
		case actionTypes.SUBMIT_REVIEW:
			return newReview(state, action)
		case actionTypes.ADD_TOUR:
			return addTour(state, action)
		case actionTypes.DELETE_TOUR:
			return deleteTour(state, action)
		case actionTypes.EDIT_TOUR:
			return editTour(state, action)
		default:
			return state
	}
}

export default reducer
