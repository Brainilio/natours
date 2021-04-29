import React, { useEffect, useState } from "react"
import TravelCard from "../../../components/TravelCards/TravelCard"
import Search from "./Search"
import Tab from "./Tab"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux"

const Explore = (props) => {
	const [formData, setFormData] = useState("")
	const [select, setSelect] = useState("")

	useEffect(() => {
		props.onFetchTours()
	}, [])

	const formChangeHandler = (e) => {
		setFormData(e.target.value)
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		props.onFetchTours(formData)
	}

	const filterHandler = (value) => {
		setSelect(value)
		if (value === "Top 5 Tours") {
			props.onFetchTopFive()
		}
		if (value === "All Tours") {
			props.onFetchTours()
		}
	}

	return (
		<section id="tours" className="home-top-tours">
			<span className="explore-title">
				EXPLORE <span>OUR LATEST TOURS</span>
			</span>
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
		onFetchTours: (data) => dispatch(actions.fetchTours(data)),
		onFetchTopFive: () => dispatch(actions.fetchTopFive()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
