import * as actionTypes from "./actiontypes"
import axios from "../../axios"

export const addReview = (review) => {
	return {
		type: actionTypes.SUBMIT_REVIEW,
		review: review,
	}
}

export const getReviews = (reviews) => {
	return {
		type: actionTypes.GET_REVIEW,
		reviews: reviews,
	}
}

export const deleteReview = (id) => {
	return {
		type: actionTypes.DELETE_REVIEW,
		id: id,
	}
}

export const submitReviews = (reviewData, tourId, userId) => {
	return (dispatch) => {
		console.log(reviewData)
		axios
			.post(`tours/${tourId}/reviews`, reviewData, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => dispatch(addReview(response.data.data.data)))
			.catch((error) => console.log(error))
	}
}

// TODO: implement actions

export const getUserSpecificReview = () => {
	return (dispatch) => {}
}

export const deleteUserSpecificReview = (id) => {
	return (dispatch) => {}
}
