import React, { useState } from "react"
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
		</section>
	)
}

export default Explore
