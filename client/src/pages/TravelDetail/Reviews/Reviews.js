import React from "react"
import ReviewCard from "../../../components/ReviewCard/reviewCard"

const Reviews = (props) => {
	return (
		<section className="detail-page-reviews">
			<span className="header-detail detail-page-map-reviews">Reviews</span>
			{props.reviews
				? props.reviews.map((review) => (
						<ReviewCard
							key={review._id}
							user={review.user}
							message={review.text}
							rating={review.rating}
						/>
				  ))
				: null}

			{props.authenticated ? (
				<button className="review-clicker" onClick={props.clicked}>
					Write review
				</button>
			) : null}
		</section>
	)
}

export default Reviews
