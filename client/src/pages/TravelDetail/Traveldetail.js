import React, { useEffect, useRef, useState } from "react"
import "./Traveldetail.scss"
import "react-alice-carousel/lib/alice-carousel.css"
import ReviewForm from "../../components/Forms/ReviewForm/ReviewForm"
import * as actions from "../../store/actions/index"
import { connect, useDispatch, useSelector } from "react-redux"
import Location from "../../components/Location/Location"
import Landing from "./Landing/Landing"
import DetailInformation from "./DetailInformation/DetailInformation"
import Description from "./Description/Description"
import Guides from "./Guides/Guides"
import ImageCarousel from "./ImageCarousel/ImageCarousel"
import Reviews from "./Reviews/Reviews"
import { Link } from "react-router-dom"
import { hasBookedTour } from "../../store/actions/tours"
import dayjs from "dayjs"

const Traveldetail = (props) => {
	const [reviewForm, setreviewForm] = useState(false)
	const descriptionBox = useRef()
	const descriptionBoxWrapper = useRef()
	const { hasBookedCurrentTour } = useSelector((state) => state.tours)
	const toggleReviewForm = () => setreviewForm((prevState) => !prevState)
	const dispatch = useDispatch()
	useEffect(() => {
		document.addEventListener("scroll", handleDescriptionBox)

		if (props.isAuthenticated) {
			dispatch(hasBookedTour(props.match.params.id))
		}
		props.onFetchTour(props.match.params.id)

		return () => {
			document.removeEventListener("scroll", handleDescriptionBox)
		}
	}, [
		props.match.params.id,
		hasBookedCurrentTour,
		props.isAuthenticated,
		descriptionBox,
	])

	const handleDescriptionBox = () => {
		console.log(window.scrollY)

		if (window.scrollY > 480 && window.scrollY < 1000) {
			descriptionBox.current.style.position = "fixed"
			descriptionBox.current.style.top = "2em"
		} else if (window.scrollY >= 900) {
			descriptionBox.current.style.position = "absolute"
			descriptionBox.current.style.top = "650px"
		} else {
			descriptionBox.current.style.position = "static"
		}
	}
	return (
		<>
			{props.tour ? (
				<>
					{props.isAuthenticated ? (
						<Link to={`/tour/${props.match.params.id}/checkout`}>
							<button
								className="detail-page-cta"
								disabled={
									props.isAuthenticated
										? hasBookedCurrentTour
											? true
											: false
										: false
								}
							>
								{hasBookedCurrentTour ? "Tour booked" : "Book now"}
							</button>
						</Link>
					) : null}
					<Landing name={props.tour.name} background={props.tour.imageCover} />
					<section className="rest-of-detail-page" ref={descriptionBoxWrapper}>
						<div className="desktop-additional-information">
							<DetailInformation
								startDate={props.tour.startDates}
								groupSize={props.tour.groupSize}
								difficulty={props.tour.difficulty}
								ratingAvg={props.tour.ratingsAverage}
								ratingsQt={props.tour.ratingsQuantity}
								price={props.tour.price}
							/>
							<Description description={props.tour.summary} />
							<Guides guides={props.tour.guides} />
							<ImageCarousel images={props.tour.images} />
							<Location location={props.tour.startLocation} />
							<Reviews
								reviews={props.reviews}
								clicked={toggleReviewForm}
								tourid={props.match.params.id}
								authenticated={props.isAuthenticated}
							/>
						</div>
						<div className="desktop-description-detail-page">
							<div className="desktop-description-box" ref={descriptionBox}>
								<h1>{props.tour.name}</h1>
								<div className="desktop-description-box-information">
									<ul>
										<li>
											<span aria-hidden className="material-icons">
												event
											</span>
											{dayjs(props.tour.startDate).format("D MMMM, YYYY")}
										</li>
										<li>
											<span aria-hidden className="material-icons">
												group
											</span>
											{props.tour.groupSize} People
										</li>
										<li>
											<span aria-hidden className="material-icons">
												trending_up
											</span>
											{props.tour.difficulty}
										</li>
										<li>
											<span aria-hidden className="material-icons rating">
												grade
											</span>
											{props.tour.ratingsAverage} ({props.tour.ratingsQuantity})
										</li>
										<li>
											<span>Total</span>
											<span>${props.tour.price}</span>
										</li>
									</ul>
								</div>
								{props.isAuthenticated ? (
									<Link to={`/tour/${props.match.params.id}/checkout`}>
										<button
											className="desktop-description-box-button"
											disabled={
												props.isAuthenticated
													? hasBookedCurrentTour
														? true
														: false
													: false
											}
										>
											{hasBookedCurrentTour ? "Tour booked" : "Book now"}
										</button>
									</Link>
								) : (
									<Link to={`/login`}>
										<button className="desktop-description-box-button">
											Log in to book!
										</button>
									</Link>
								)}
							</div>
						</div>
					</section>

					{reviewForm ? (
						<ReviewForm
							clicked={toggleReviewForm}
							show={reviewForm}
							tourid={props.match.params.id}
						/>
					) : null}
				</>
			) : (
				<span>Loading...</span>
			)}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		tour: state.tours.currentTour,
		error: state.tours.error,
		reviews: state.tours.currentReviews,
		loading: state.tours.loadCurrentTour,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchTour: (id) => dispatch(actions.fetchSingleTour(id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(Traveldetail))
