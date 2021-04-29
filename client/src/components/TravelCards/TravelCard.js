import dayjs from "dayjs"
import React from "react"
import { NavLink } from "react-router-dom"
import "./TravelCard.scss"

const TravelCard = (props) => {
	let rating = []

	for (let i = 0; i < Math.floor(props.tour.ratingsAverage); i++) {
		rating.push(
			<span aria-hidden key={i} className="material-icons">
				grade
			</span>
		)
	}

	const styles = {
		background: `url(${props.tour.imageCover}) center/cover`,
	}

	return (
		<div className="travel-card" style={styles}>
			<div className="travel-card-upper-row">
				<div className="travel-card-price">$ {props.tour.price}-</div>
				<div className="travel-card-rating">
					{rating.map((rating) => rating)}
				</div>
			</div>
			<NavLink to={`/tour/${props.tour._id}`}>
				<div className="travel-card-lower-row">
					<span>{props.tour.name}</span>
					<span className="tour-date">
						{dayjs(props.tour.startDate).format("D MMMM, YYYY")}
					</span>
					<button className="travel-card-button">Book now</button>
				</div>
			</NavLink>
		</div>
	)
}

export default TravelCard
