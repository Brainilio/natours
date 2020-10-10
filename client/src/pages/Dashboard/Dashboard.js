import React from "react"
import "./Dashboard.scss"
import person from "../../resource/person.jpg"
import { NavLink } from "react-router-dom"

const Dashboard = () => {
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
					</ul>
				</div>
				<div className="dashboard-user">
					<img src={person} />
					<span>Hi, Christian!</span>
				</div>
			</section>

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
		</>
	)
}

export default Dashboard
