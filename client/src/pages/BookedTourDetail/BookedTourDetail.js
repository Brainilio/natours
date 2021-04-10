import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../components/Spinner/Spinner"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"
import { fetchBookedTours } from "../../store/actions/tours"
import "./BookedTourDetail.scss"

const BookedTourDetail = (props) => {
	const dispatch = useDispatch()
	const { bookedTours } = useSelector((state) => state.tours)

	useEffect(() => {
		dispatch(fetchBookedTours())
	}, [])

	return (
		<section className="booked-tour-detail-page">
			<DashboardBanner />
			{bookedTours && bookedTours.length > 1 ? (
				bookedTours
					.filter((b) => b._id === props.match.params.id)
					.map((bt) => (
						<>
							<div
								key={bt._id}
								className="bt-detail-header"
								style={{
									background: `url(${bt.tour.imageCover}) center/cover`,
									backgroundBlendMode: "darken",
								}}
							>
								{bt.tour.name}
								<span>Details</span>
							</div>
						</>
					))
			) : (
				<Spinner />
			)}
		</section>
	)
}

export default BookedTourDetail
