import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import image from "../../../resource/admin.jpg"

// replace image with the image src

/* 

TODO: 
- Modal for details
- Modal for editing 
- Modal for adding 
- Delete operation


*/

const TourBar = (props) => {
	return (
		<div className="admin-dashboard-tour">
			<span>{props.tour.name}</span>
			<span className="admin-crud-operations">
				<span
					aria-hidden
					className="material-icons"
					onClick={() => props.detailHandler()}
				>
					pageview
				</span>
				<span
					aria-hidden
					className="material-icons"
					onClick={() => props.editHandler()}
				>
					create
				</span>
				<span
					aria-hidden
					className="material-icons"
					onClick={() => props.deleteTour(props.tour._id)}
				>
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
