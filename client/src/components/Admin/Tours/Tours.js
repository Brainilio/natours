import React, { useEffect } from "react"
import { connect } from "react-redux"
import "./Tours.scss"
import * as actions from "../../../store/actions/"

import DashboardBanner from "../../DashboardBanner/DashboardBanner"
import TourBar from "./TourBar"

/*
TODO: 
- Create button that opens modal 
- Modal should contain a form that allows you to create a new tour 
- Create a table (OR CARDS) with all tours: name, date, rating, maximum amount of people
- tour operations: delete, edit tour (in modal ? or separate page)
*/

const Tours = (props) => {
	useEffect(() => {
		props.fetchTours()
	}, [])

	let tours = null

	if (props.allTours) {
		tours = props.allTours.map((tour) => <TourBar key={tour._id} tour={tour} />)
	}

	return (
		<>
			<DashboardBanner />
			<section className="admin-tours-section">
				<span className="admin-tours-title">All tours</span>
				{tours ? tours : null}
			</section>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		allTours: state.tours.allTours,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTours: () => dispatch(actions.fetchTours()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Tours))
