import React, { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import image from "../../../resource/admin.jpg"

// replace image with the image src

/* 

TODO: 
- Modal for details
- Modal for editing 
- Modal for adding 

*/

const TourBar = (props) => {
	const history = useHistory()

	useEffect(() => {
		console.log(props.tour.imageCover)
	}, [])
	return (
		<div className="admin-dashboard-tour">
			<span>{props.tour.name}</span>
			<span className="admin-crud-operations">
				<span
					aria-hidden
					className="material-icons"
					onClick={() => history.push(`tour/${props.tour._id}`)}
				>
					pageview
				</span>
				<span
					aria-hidden
					className="material-icons"
					onClick={() => props.editHandler(props.tour._id)}
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

			<img src={props.tour.imageCover} alt="background" />
		</div>
	)
}

export default TourBar
