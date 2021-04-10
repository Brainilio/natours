import React from "react"
import "./BookedTours.scss"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"
import ListBookedTours from "../../components/ListBookedTours/ListBookedTours"
import TourAdvice from "../../components/TourAdvice/TourAdvice"

const BookedTours = () => {
	return (
		<section className="booked-tours-page">
			<DashboardBanner />
			<div className="booked-tours-main-content">
				<div className="booked-tours-main-content-title">
					<h1>Your booked tours</h1>
					<span>Contact us if you have more questions!</span>
				</div>

				<div className="booked-tours-page-upcoming-tours">
					<ListBookedTours />
				</div>

				<div className="booked-tours-main-content-title">
					<h1>Prepare for your tour!</h1>
					<span>Here are the latest tips and tricks for you!</span>
				</div>
				<TourAdvice />
			</div>
		</section>
	)
}

export default BookedTours
