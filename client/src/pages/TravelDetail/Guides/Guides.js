import React from "react"
import PersonOne from "../../../resource/person-1.jpg"
import personTwo from "../../../resource/person-2.jpg"

const Guides = () => {
	return (
		<section className="detail-page-guides">
			<span className="header-detail detail-page-description-title">
				Guides
			</span>
			<div className="detail-page-guides-pictures">
				<img src={PersonOne} />
				<img src={personTwo} />
			</div>
		</section>
	)
}

export default Guides
