import React, { useEffect } from "react"
import "./Dashboard.scss"
import adminCard1 from "../../resource/adminCard1.svg"
import adminCard2 from "../../resource/adminCard2.svg"
import adminCard3 from "../../resource/adminCard3.svg"
import adminCard4 from "../../resource/adminCard4.svg"
import { Link, NavLink } from "react-router-dom"
import * as actions from "../../store/actions/index"
import { connect, useDispatch, useSelector } from "react-redux"
import ListForReviews from "../MyReviews/ListForReviews"
import { fetchBookedTours } from "../../store/actions/tours"
import ListBookedTours from "../../components/ListBookedTours/ListBookedTours"
import TourAdvice from "../../components/TourAdvice/TourAdvice"
import Support from "../../components/Support/Support"
import NewsArticle from "../../components/NewsArticle/NewsArticle"
// import regular from "../../resource/venice.jpg"
// import admin from "../../resource/admin.jpg"

const Dashboard = (props) => {
	useEffect(() => {
		props.fetchReviews()
	}, [])

	let adminFunctionalities = null
	let adminPanels = null

	if (props.role === "admin") {
		adminFunctionalities = (
			<>
				<NavLink to="/tours">
					<li>All tours</li>
				</NavLink>
				<NavLink to="/users">
					<li>All users</li>
				</NavLink>
				<NavLink to="/statistics">
					<li>Statistics</li>
				</NavLink>
			</>
		)
		adminPanels = (
			<section className="dashboard-page-admin-panels">
				<Link to="/tours">
					<img src={adminCard1} />
				</Link>
				<Link to="/statistics">
					<img src={adminCard2} />
				</Link>
				<Link to="/tours">
					<img src={adminCard3} />
				</Link>
				<Link to="/users">
					<img src={adminCard4} />
				</Link>
			</section>
		)
	}

	return (
		<>
			<section className="dashboard-page">
				<div className="dashboard-actions">
					<ul>
						<NavLink to="/settings">
							<li>Settings</li>
						</NavLink>
						<NavLink to="/bookedtours">
							<li>Booked Tours</li>
						</NavLink>
						<NavLink to="/myreviews">
							<li>My Reviews</li>
						</NavLink>
						{adminFunctionalities}
					</ul>
				</div>
				<div className="dashboard-user">
					<img src={props.photo} />
					<span>Hi, {props.userName}!</span>
				</div>
			</section>

			{adminPanels}

			<section className="dashboard-page-upcoming-tours">
				<div className="upcoming-tours-title">
					<span className="dashboard-title-header">Your upcoming tours</span>
					<span className="dashboard-title-view">View all</span>
				</div>
				<ListBookedTours />
			</section>

			<section className="dashboard-page-reviews">
				<div className="reviews-title">
					<span className="dashboard-title-header">My Reviews</span>
					<NavLink to="/myreviews" style={{ color: "black" }}>
						<span className="dashboard-title-view">View all</span>
					</NavLink>
				</div>
				<ListForReviews sliceTrue={true} />
			</section>

			<section className="dashboard-page-advice">
				<div className="dashboard-page-advice-title">
					<h1>Prepare for your tour!</h1>
					<span>Here are the latest tips and tricks for you!</span>
				</div>
				<TourAdvice />
			</section>

			<section className="dashboard-page-latest-news">
				<div className="dashboard-page-latest-news-header">
					<h1>Latest travel news</h1>
					<span>Lorem ipsum dolor sit amet, consectetur.</span>
				</div>
				<NewsArticle />
			</section>

			<section className="dashboard-page-support">
				<Support />
			</section>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		userName: state.auth.name,
		role: state.auth.role,
		photo: state.auth.photo,
		reviews: state.auth.reviews,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchReviews: () => dispatch(actions.getUserSpecificReview()),
		deleteReview: (id) => dispatch(actions.deleteUserSpecificReview(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
