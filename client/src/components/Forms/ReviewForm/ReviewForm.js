import React, { useState } from "react"
import Modal from "../../../ui/Modal/Modal"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux"
import StarPicker from "react-star-picker"

const ReviewForm = (props) => {
	const [review, setReview] = useState({
		rating: 1,
		text: "",
	})

	const formHandler = (e) => {
		const name = e.target.name
		const value = e.target.value

		setReview({
			...review,
			[name]: value,
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		props.submitReview(review, props.tourid)
		props.clicked()
	}

	return (
		<Modal clicked={props.clicked} show={props.show}>
			<form className="review-form" onSubmit={(e) => formSubmitHandler(e)}>
				<h2 className="review-title">Write your review</h2>

				<input
					type="text"
					value={review.text}
					onChange={(e) => formHandler(e)}
					name="text"
					placeholder="Write your review.."
				></input>
				<StarPicker
					onChange={(value) => setReview({ ...review, rating: value })}
					value={review.rating}
				/>
				{/* <select name="rating" onChange={(e) => formHandler(e)}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select> */}
				<button onClick={(e) => formSubmitHandler(e)} type="submit">
					Send review
				</button>
			</form>
		</Modal>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitReview: (body, tourid) =>
			dispatch(actions.submitReviews(body, tourid)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
