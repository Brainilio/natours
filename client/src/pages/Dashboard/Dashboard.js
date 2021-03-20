import React, { useEffect } from "react"
import "./Dashboard.scss"
import person from "../../resource/person.jpg"
import { NavLink } from "react-router-dom"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
// import regular from "../../resource/venice.jpg"
// import admin from "../../resource/admin.jpg"

const Dashboard = (props) => {
	console.log(props.role)

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
			</>
		)
		adminPanels = (
			<section className="dashboard-page-admin-panels">
				Admin: statistics, payments, create new tour, view tours
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
						<NavLink to="/mytours">
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
					<span className="dashboard-title-header">Upcoming tours</span>
					<span className="dashboard-title-view">View all</span>
				</div>

				<div className="upcoming-tour">
					<span>
						<span aria-hidden className="material-icons">
							location_on
						</span>
						Yosemite USA
					</span>
					<span>
						<span aria-hidden className="material-icons">
							event
						</span>
						October 15, 2020
					</span>
					<span>
						<NavLink to="/"> &gt;</NavLink>
					</span>
				</div>

				<div className="upcoming-tour">
					<span>
						<span aria-hidden className="material-icons">
							location_on
						</span>
						Yosemite USA
					</span>
					<span>
						<span aria-hidden className="material-icons">
							event
						</span>
						October 15, 2020
					</span>
					<span>
						<NavLink to="/"> &gt;</NavLink>
					</span>
				</div>

				<div className="upcoming-tour">
					<span>
						<span aria-hidden className="material-icons">
							location_on
						</span>
						Yosemite USA
					</span>
					<span>
						<span aria-hidden className="material-icons">
							event
						</span>
						October 15, 2020
					</span>
					<span>
						<NavLink to="/"> &gt;</NavLink>
					</span>
				</div>
			</section>

			<section className="dashboard-page-reviews">
				<span className="dashboard-title-header">My Reviews</span>

				{/* TODO: IMPLEMENT GET REVIEWS & DELETE REVIEWS */}
				<div className="user-review">
					<span className="user-review-tour-name">
						<span aria-hidden className="material-icons">
							location_on
						</span>
						Pitburger, Austria
					</span>
					<span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
					</span>
				</div>

				<div className="user-review">
					<span className="user-review-tour-name">
						<span aria-hidden className="material-icons">
							location_on
						</span>
						Pitburger, Austria
					</span>
					<span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
						<span aria-hidden className="material-icons rating">
							grade
						</span>
					</span>
				</div>
			</section>

			{/* Add condition to check if user.role === admin */}
			{/* <AdminDashboard /> */}
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
