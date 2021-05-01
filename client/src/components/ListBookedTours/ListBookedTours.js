import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"
import { fetchBookedTours } from "../../store/actions/tours"
import { NavLink } from "react-router-dom"

const ListBookedTours = (props) => {
	const dispatch = useDispatch()
	const { bookedTours } = useSelector((state) => state.tours)

	useEffect(() => {
		dispatch(fetchBookedTours())
	}, [props])

	return bookedTours && bookedTours.length ? (
		bookedTours.map((b) => (
			<div
				key={b._id}
				className="upcoming-tour"
				style={{
					background: `url(${b.tour.imageCover}) center/cover`,
				}}
			>
				<span>
					<span aria-hidden className="material-icons">
						location_on
					</span>
					{b.tour.name}
				</span>
				<span>
					<span aria-hidden className="material-icons">
						event
					</span>
					{dayjs(b.tour.startDate).format("dddd, MMMM D YYYY")}
				</span>
				<span>
					<NavLink to={`/bookedtours/${b._id}`}>Go to Tour &gt;</NavLink>
				</span>
			</div>
		))
	) : (
		<span>No tours booked</span>
	)
}

export default ListBookedTours
