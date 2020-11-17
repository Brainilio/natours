import React from "react"
import { NavLink } from "react-router-dom"
import dayjs from "dayjs"

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
				{dayjs(props.tour.startDate).format("D MMM, YYYY")}
			</span>
			<span>
				<NavLink to="/"> &gt;</NavLink>
			</span>
		</div>
	)
}

export default TourBar
