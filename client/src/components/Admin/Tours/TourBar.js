import React from "react"
import { NavLink } from "react-router-dom"
import dayjs from "dayjs"
import image from "../../../resource/admin.jpg"

// replace image with the image src

const TourBar = (props) => {
	return (
		<div className="admin-dashboard-tour">
			<span>{props.tour.name}</span>
			<span className="admin-crud-operations">
				<span aria-hidden className="material-icons">
					pageview
				</span>
				<span aria-hidden className="material-icons">
					create
				</span>
				<span aria-hidden className="material-icons">
					delete
				</span>

				{/* add following: detail, edit, delete
				{dayjs(props.tour.startDate).format("D MMM, YYYY")} */}
			</span>

			<img src={image} />
		</div>
	)
}

export default TourBar
