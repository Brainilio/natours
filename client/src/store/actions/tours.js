import axios from "../../axios"
import * as actionTypes from "./actiontypes"

// action types

// For all tours
export const loadToursStart = () => {
	return {
		type: actionTypes.LOAD_TOURS_START,
	}
}

export const loadToursSuccess = (tours) => {
	console.log("going to the reducers! ")

	return {
		tours: tours,
		type: actionTypes.LOAD_TOURS_SUCCESS,
	}
}

export const loadToursFail = (error) => {
	return {
		error: error,
		type: actionTypes.LOAD_TOURS_FAIL,
	}
}

// for single tour

export const loadSingleTourStart = () => {
	return {
		type: actionTypes.LOAD_SINGLE_TOUR_START,
	}
}

export const loadSingleTourSuccess = (tour, reviews) => {
	return {
		reviews: reviews,
		tour: tour,
		type: actionTypes.LOAD_SINGLE_TOUR_SUCCESS,
	}
}

export const loadSingleTourFail = (error) => {
	return {
		error: error,
		type: actionTypes.LOAD_SINGLE_TOUR_FAIL,
	}
}

// dispatch functions

export const fetchTours = () => {
	return (dispatch) => {
		dispatch(loadToursStart())
		axios
			.get("tours")
			.then((response) => {
				dispatch(loadToursSuccess(response.data.data.doc))
			})
			.catch((error) => dispatch(loadToursFail(error)))
	}
}

export const fetchTopFive = () => {
	return (dispatch) => {
		dispatch(loadToursStart())
		axios
			.get("/tours/?sort=ratingsAverage&limit=5")
			.then((response) => {
				console.log(response)
				dispatch(loadToursSuccess(response.data.data.doc))
			})
			.catch((error) => dispatch(loadToursFail(error)))
	}
}

export const fetchSingleTour = (id) => {
	return (dispatch) => {
		dispatch(loadSingleTourStart())
		axios
			.get(`tours/${id}`)
			.then((response) => {
				console.log(response.data.data)
				return response
			})
			.then(async (response) => {
				let newResponse = await axios.get(
					`tours/${id}/reviews/?sort=createdAt&limit=3`
				)
				dispatch(
					loadSingleTourSuccess(response.data.data, newResponse.data.data.doc)
				)
			})
			.catch((error) => dispatch(loadSingleTourFail(error)))
	}
}
