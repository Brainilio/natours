import React from "react"
import "./TravelCard.scss"

const TravelCard = () => {
	return (
		<div className="travel-card">
			<div className="travel-card-upper-row">
				<div className="travel-card-price">$430,-</div>
				<div className="travel-card-rating">X X X X</div>
			</div>
			<div className="travel-card-lower-row">
				<span>MONUMENT VALLEY, USA</span>
			</div>
		</div>
	)
}

export default TravelCard
