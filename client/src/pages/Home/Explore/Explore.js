import React, { useState } from "react"
import TravelCard from "../../../components/TravelCards/TravelCard"
import Search from "./Search"
import Tab from "./Tab"

const Explore = (props) => {
	const [formData, setFormData] = useState("")

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
		<section className="home-top-tours">
			<span className="explore-title">EXPLORE</span>
			<Search
				value={formData}
				change={formChangeHandler}
				submit={formSubmitHandler}
			/>
			<Tab click={filterHandler} />
			<div className="home-cards-layout-section">
				<TravelCard />
				<TravelCard />
				<TravelCard />
				<TravelCard />
				<TravelCard />
				<TravelCard />
			</div>
		</section>
	)
}

export default Explore
