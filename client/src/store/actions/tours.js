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

export const canBook = (bool) => {
	return {
		type: actionTypes.CAN_BOOK,
		bool: bool,
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

export const getBookedTours = (bookedTours) => {
	return {
		type: actionTypes.GET_BOOKED_TOURS,
		bookedTours: bookedTours,
	}
}
// dispatch functions

export const fetchTours = (config) => {
	return (dispatch) => {
		dispatch(loadToursStart())

		if (config) {
			axios
				.get(`tours/?name=${config}`)
				.then((response) => {
					dispatch(loadToursSuccess(response.data.data.doc))
				})
				.catch((error) => dispatch(loadToursFail(error)))
		} else {
			axios
				.get("tours")
				.then((response) => {
					dispatch(loadToursSuccess(response.data.data.doc))
				})
				.catch((error) => dispatch(loadToursFail(error)))
		}
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

export const hasBookedTour = (tourid) => {
	return (dispatch) => {
		const token = localStorage.getItem("token")

		axios
			.get(`booking/${tourid}/hasBookedTour`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response.data)
				dispatch(canBook(response.data))
			})
			.catch((err) => console.log(err))
	}
}

export const fetchBookedTours = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token")
		axios
			.get("booking/bookedTours", {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				console.log(response.data)
				dispatch(getBookedTours(response.data.bookedTours))
			})
			.catch((error) => console.log(error))
	}
}
