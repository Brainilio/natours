import React from "react"
import { NavLink } from "react-router-dom"
import person from "../../../resource/person.jpg"
import * as actions from "../../../store/actions/"
import { connect } from "react-redux"
import "./Tours.scss"

/*
TODO: 
- Create button that opens modal 
- Modal should contain a form that allows you to create a new tour 
- Create a table (OR CARDS) with all tours: name, date, rating, maximum amount of people
- tour operations: delete, edit tour (in modal)
*/

const Tours = (props) => {
	return (
		<>
			<section className="dashboard-page">
				<div className="dashboard-actions">
					<ul>
						<NavLink to="/dashboard">
							<li>&lt;</li>
						</NavLink>
					</ul>
				</div>
				<div className="dashboard-user">
					<img src={person} />
					<span>Hi, Christian!</span>
				</div>
			</section>
			<section className="admin-tours-section"></section>
		</>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Tours))
