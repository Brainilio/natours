import React, { useState } from "react"
import Modal from "../../../ui/Modal/Modal"

const ReviewForm = (props) => {
	const [review, setReview] = useState({
		user: "John Doe",
		rating: "",
		message: "",
	})

	const formHandler = (e) => {
		const name = e.target.name
		const value = e.target.value

		setReview({
			...review,
			[name]: value,
		})

		console.log(review)
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		console.log(review)
		props.clicked()
	}

	return (
		<Modal clicked={props.clicked} show={props.show}>
			<form className="sign-up-form" onSubmit={(e) => formSubmitHandler(e)}>
				<span className="signup-title">Write your review</span>

				<input
					type="text"
					value={review.message}
					onChange={(e) => formHandler(e)}
					name="message"
					placeholder="Write your review.."
				></input>
				<select name="rating" onChange={(e) => formHandler(e)}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<button onClick={(e) => formSubmitHandler(e)} type="submit">
					Send review
				</button>
			</form>
		</Modal>
	)
}

export default ReviewForm
