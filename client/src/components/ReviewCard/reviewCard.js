import React from "react"
import person from "../../resource/person.jpg"

const ReviewCard = (props) => {
	let reviews = []
	for (let i = 0; i < props.rating; i++) {
		reviews.push(
			<span key={i} aria-hidden className="material-icons rating">
				grade
			</span>
		)
	}
	return (
		<div className="review-card">
			<div className="review-stars">{reviews.map((review) => review)}</div>
			<div className="review-personal">
				<img src={person} />
				<span>{props.user.name}</span>
			</div>
			<p>{props.message}</p>
		</div>
	)
}

export default ReviewCard
