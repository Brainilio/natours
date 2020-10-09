import React from "react"
import { NavLink } from "react-router-dom"
import "./TravelCard.scss"

const TravelCard = () => {
	return (
		<div className="travel-card">
			<NavLink
				to={{
					pathname: `/tour/${2}`,
				}}
			>
				<div className="travel-card-upper-row">
					<div className="travel-card-price">$430,-</div>
					<div className="travel-card-rating">X X X X</div>
				</div>
				<div className="travel-card-lower-row">
					<span>MONUMENT VALLEY, USA</span>
				</div>
			</NavLink>
		</div>
	)
}

export default TravelCard
