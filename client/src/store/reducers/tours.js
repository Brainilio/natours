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
	closeFormModal: false,
	hasBookedCurrentTour: false,
	bookedTours: null,
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

const loadBookedTours = (state, action) => {
	return { ...state, bookedTours: action.bookedTours }
}

const newReview = (state, action) => {
	let reviews = [...state.currentReviews]
	reviews.push(action.review)

	console.log("Going to add..." + action.review)

	return { ...state, currentReviews: reviews }
}

const setBookedBoolean = (state, action) => {
	return { ...state, hasBookedCurrentTour: action.bool }
}

// TODO: set up all these actions

const addTour = (state, action) => {
	let tours = [...state.allTours]
	let newTour = tours.concat(action.tour)
	return { ...state, allTours: newTour, loadTours: false, error: null }
}

const deleteTour = (state, action) => {
	let newTours = state.allTours.filter((tour) => tour._id !== action.tour)
	return { ...state, allTours: newTours }
}

const editTour = (state, action) => {
	return { ...state }
}

const stopLoading = (state, action) => {
	return { ...state, loadTours: false, error: null }
}

const addTourError = (state, action) => {
	return { ...state, loadTours: false, error: action.error }
}

const closeModal = (state, action) => {
	return { ...state, closeFormModal: true }
}

const openModal = (state, action) => {
	return { ...state, closeFormModal: false }
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
		case actionTypes.CLOSE_MODAL:
			return closeModal(state, action)
		case actionTypes.OPEN_MODAL:
			return openModal(state, action)
		case actionTypes.SUBMIT_REVIEW:
			return newReview(state, action)
		case actionTypes.ADD_TOUR:
			return addTour(state, action)
		case actionTypes.ADD_TOUR_ERROR:
			return addTourError(state, action)
		case actionTypes.DELETE_TOUR:
			return deleteTour(state, action)
		case actionTypes.EDIT_TOUR:
			return editTour(state, action)
		case actionTypes.STOP_LOADING:
			return stopLoading(state, action)
		case actionTypes.CAN_BOOK:
			return setBookedBoolean(state, action)
		case actionTypes.GET_BOOKED_TOURS:
			return loadBookedTours(state, action)
		default:
			return state
	}
}

export default reducer
