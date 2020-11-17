import React from "react"
import { connect } from "react-redux"
import "./Tours.scss"
import DashboardBanner from "../../DashboardBanner/DashboardBanner"

/*
TODO: 
- Create button that opens modal 
- Modal should contain a form that allows you to create a new tour 
- Create a table (OR CARDS) with all tours: name, date, rating, maximum amount of people
- tour operations: delete, edit tour (in modal ? or separate page)
*/

const Tours = (props) => {
	return (
		<>
			<DashboardBanner />
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
