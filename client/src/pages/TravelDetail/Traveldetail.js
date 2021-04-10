import React, { useEffect, useState } from "react"
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

const Traveldetail = (props) => {
	const [reviewForm, setreviewForm] = useState(false)
	const { hasBookedCurrentTour } = useSelector((state) => state.tours)
	const toggleReviewForm = () => setreviewForm((prevState) => !prevState)
	const dispatch = useDispatch()
	useEffect(() => {
		if (props.isAuthenticated) {
			dispatch(hasBookedTour(props.match.params.id))
		}
		props.onFetchTour(props.match.params.id)
	}, [props.match.params.id, hasBookedCurrentTour, props.isAuthenticated])

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
