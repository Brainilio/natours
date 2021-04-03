import React from "react"
// import PersonOne from "../../../resource/person-1.jpg"
// import personTwo from "../../../resource/person-2.jpg"

const Guides = (props) => {
	return (
		<section className="detail-page-guides">
			<span className="header-detail detail-page-description-title">
				Guide(s)
			</span>
			<div className="detail-page-guides-pictures">
				{props.guides.map((g) => (
					<img key={g.name} src={g.photo} />
				))}
			</div>
		</section>
	)
}

export default Guides
