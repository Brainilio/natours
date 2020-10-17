import React from "react"
import ReviewCard from "../../../components/ReviewCard/reviewCard"

const Reviews = (props) => {
	return (
		<section className="detail-page-reviews">
			<span className="header-detail detail-page-map-reviews">Reviews</span>
			{props.reviews
				? props.reviews
						//.slice(0, 3)
						.map((review) => (
							<ReviewCard
								key={review._id}
								user={review.user}
								message={review.text}
								rating={review.rating}
							/>
						))
				: null}

			{/* If auth: */}
			<button className="review-clicker" onClick={props.clicked}>
				Write review
			</button>
		</section>
	)
}

export default Reviews
