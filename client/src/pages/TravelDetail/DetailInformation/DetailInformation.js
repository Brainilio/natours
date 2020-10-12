import React from "react"
import dayjs from "dayjs"

const DetailInformation = (props) => {
	return (
		<section className="detail-page-information">
			<div className="detail-page-information-left">
				<ul>
					<li>
						<span aria-hidden className="material-icons">
							event
						</span>
						{dayjs(props.startDate).format("D MMMM, YYYY")}
					</li>
					<li>
						<span aria-hidden className="material-icons">
							group
						</span>
						{props.groupSize} People
					</li>
					<li>
						<span aria-hidden className="material-icons">
							trending_up
						</span>
						{props.difficulty}
					</li>
					<li>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						{props.ratingAvg} ({props.ratingsQt})
					</li>
				</ul>
			</div>
			<div className="detail-page-information-right">$ {props.price}</div>
		</section>
	)
}

export default DetailInformation
