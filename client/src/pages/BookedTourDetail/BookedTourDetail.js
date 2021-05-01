import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../components/Spinner/Spinner"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"
import { fetchBookedTours } from "../../store/actions/tours"
import "./BookedTourDetail.scss"
import dayjs from "dayjs"
import Support from "../../components/Support/Support"

const BookedTourDetail = (props) => {
	const dispatch = useDispatch()
	const { bookedTours } = useSelector((state) => state.tours)

	useEffect(() => {
		dispatch(fetchBookedTours())
	}, [])

	return (
		<>
			<DashboardBanner />
			<section className="booked-tour-detail-page">
				{bookedTours && bookedTours.length > 1 ? (
					bookedTours
						.filter((b) => b._id === props.match.params.id)
						.map((bt) => (
							<section key={bt._id}>
								<div
									className="bt-detail-header"
									style={{
										background: `url(${bt.tour.imageCover}) center/cover`,
										backgroundBlendMode: "darken",
									}}
								>
									{bt.tour.name}
									<span>Details</span>
								</div>
								<div className="bt-detail-main-and-footer">
									<div className="bt-detail-main">
										<div>
											<h3>Invoice date</h3>
											<span>
												{dayjs(bt.createdAt).format("dddd, MMMM D YYYY")}
											</span>
										</div>
										<div>
											<h3>Payment</h3>
											<span>{bt.paid ? "Confirmed" : "Not paid"}</span>
										</div>
										<div>
											<h3>Price paid</h3>
											<span>${bt.tour.price}.-</span>
										</div>
										<div>
											<h3>Trip Start Date</h3>
											<span>
												{dayjs(bt.tour.startDates).format("dddd, MMMM D YYYY")}
											</span>
										</div>
										<div>
											<h3>Trip Duration</h3>
											<span>{bt.tour.durationWeeks.toFixed(1)} weeks</span>
										</div>
										<div>
											<h3>Your name</h3>
											<span>{bt.user.name}</span>
										</div>
										<div>
											<h3>Your Email</h3>
											<span>{bt.user.email}</span>
										</div>
										<div>
											<h3>Guide(s)</h3>
											{bt.tour.guides.map((g) => (
												<div className="guides-photos" key={g._id}>
													<img src={g.photo} width="100" height="100" />
													<span>{g.name}</span>
												</div>
											))}
										</div>
										<button className="print-ticket-button">
											Print your ticket
										</button>
									</div>
									<div className="bt-detail-footer">
										<h1>Instructions for your tour</h1>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Ut enim ad minim veniam, quis nostrud exercitation
											ullamco laboris nisi ut aliquip ex ea commodo consequat.
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla pariatur.
										</p>
									</div>
								</div>

								<div className="bt-detail-footer-two">
									{/* <h1>Contact support?</h1>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</span> */}
									<Support />
								</div>
							</section>
						))
				) : (
					<Spinner />
				)}
			</section>
		</>
	)
}

export default BookedTourDetail
