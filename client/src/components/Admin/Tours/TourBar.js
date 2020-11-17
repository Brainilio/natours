import React from "react"
import { NavLink } from "react-router-dom"
import dayjs from "dayjs"
import image from "../../../resource/admin.jpg"

// replace image with the image src

const TourBar = (props) => {
	return (
		<div className="admin-dashboard-tour">
			<span>
				<span aria-hidden className="material-icons">
					location_on
				</span>
				{props.tour.name}
			</span>
			<span>
				<span aria-hidden className="material-icons">
					event
				</span>

				{/* add following: detail, edit, delete */}
				{dayjs(props.tour.startDate).format("D MMM, YYYY")}
			</span>
			<span>
				<NavLink to="/"> &gt;</NavLink>
			</span>
			<img src={image} />
		</div>
	)
}

export default TourBar
