import React from "react"

const Description = (props) => {
	return (
		<section className="detail-page-description">
			<span className="header-detail detail-page-description-title">
				Description
			</span>
			<p className="detail-page-description-description">{props.description}</p>
		</section>
	)
}

export default Description
