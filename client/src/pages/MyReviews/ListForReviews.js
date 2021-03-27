import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "../../axios"
import { Link } from "react-router-dom"

const ListForReviews = ({ sliceTrue = false }) => {
	const { token } = useSelector((state) => state.auth)
	const [rev, setrevs] = useState([])

	useEffect(() => {
		fetchReviews()
	}, [])

	const fetchReviews = () => {
		axios
			.get("reviews/ownreviews", { headers: { Authorization: token } })
			.then((response) => setrevs(response.data.data.data))
			.catch((error) => console.log(error))
	}

	const deleteCard = (id) => {
		axios
			.delete(`reviews/${id}`)
			.then(() => fetchReviews())
			.catch((error) => console.log(error))
	}

	let cards = []

	rev.map((review) => {
		let rating = []
		for (let i = 0; i < review.rating; i++) {
			rating.push(
				<span key={i} aria-hidden className="material-icons rating">
					grade
				</span>
			)
		}

		cards.push(
			<div key={review._id} className="user-review">
				<span className="user-review-tour-name">
					<span aria-hidden className="material-icons">
						location_on
					</span>
					<Link style={{ color: "black" }} to={`/tour/${review.tour}`}>
						{review.tour.name}
					</Link>
				</span>
				<span>{rating.map((r) => r)}</span>
				<span
					style={{ cursor: "pointer", color: "red" }}
					onClick={() => deleteCard(review._id)}
					aria-hidden
					className="material-icons"
				>
					delete
				</span>
			</div>
		)
	})
	return sliceTrue ? cards.slice(0, 2).map((c) => c) : cards.map((c) => c)
}

export default ListForReviews
