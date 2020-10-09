import React from "react"
import person from "../../resource/person.jpg"

const reviewCard = () => {
	return (
		<div className="review-card">
			<div className="review-stars"> **** </div>
			<div className="review-personal">
				<img src={person} />
				<span>John Doe</span>
			</div>
			<p>
				eleifend consectetur lorem. Nullam nec diam lectus. Mauris vitae
				convallis neque. Orci varius natoque penatibus et magnis dis parturient
				montes.
			</p>
		</div>
	)
}

export default reviewCard
