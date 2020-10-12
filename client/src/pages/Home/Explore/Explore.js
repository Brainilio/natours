import React, { useEffect, useState } from "react"
import TravelCard from "../../../components/TravelCards/TravelCard"
import Search from "./Search"
import Tab from "./Tab"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux"

const Explore = (props) => {
	const [formData, setFormData] = useState("")

	useEffect(() => {
		props.onFetchTours()
	}, [])

	const formChangeHandler = (e) => {
		setFormData(e.target.value)
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		console.log("You're searching for:  " + formData)
	}

	const filterHandler = (value) => {
		console.log("Filtering on.. " + value)
	}

	return (
		<section id="tours" className="home-top-tours">
			<span className="explore-title">EXPLORE</span>
			<Search
				value={formData}
				change={formChangeHandler}
				submit={formSubmitHandler}
			/>
			<Tab click={filterHandler} />
			<div className="home-cards-layout-section">
				{props.tours ? (
					props.tours.map((tour) => <TravelCard key={tour._id} tour={tour} />)
				) : (
					<span>No tours available!</span>
				)}
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		tours: state.tours.allTours,
		error: state.tours.error,
		loading: state.tours.loadTours,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchTours: () => dispatch(actions.fetchTours()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
