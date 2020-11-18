import React, { useState } from "react"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux"

const CreateTourForm = (props) => {
	const [tour, setTour] = useState({
		name: "Fortaleza",
		duration: "",
		groupSize: "",
		difficulty: "easy",
		startLocation: {
			description: "",
			coordinates: [28.978043, -81.598384],
			address: "",
		},
		price: "",
		summary: "",
		imageCover: "image.jpg",
		images: "",
		startDates: "",
	})

	const formHandler = (e) => {
		const name = e.target.name
		const value = e.target.value

		setTour({
			...tour,
			[name]: value,
		})
	}

	const locationHandler = (e) => {
		const name = e.target.name
		const value = e.target.value

		if (name === "coordinates") {
			let newData = value.split(",")

			setTour({
				...tour,
				startLocation: {
					...tour.startLocation,
					[name]: [...newData],
				},
			})
		}

		setTour({
			...tour,
			startLocation: {
				...tour.startLocation,
				[name]: value,
			},
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		props.createTour(tour)
	}

	return (
		<form onSubmit={(e) => formSubmitHandler(e)}>
			<input
				type="text"
				value={tour.name}
				onChange={(e) => formHandler(e)}
				name="name"
				placeholder="Tour name?"
			/>
			<input
				type="number"
				min="1"
				max="10"
				value={tour.duration}
				onChange={(e) => formHandler(e)}
				name="duration"
				placeholder="Tour duration?"
			/>
			<input
				type="number"
				value={tour.groupSize}
				onChange={(e) => formHandler(e)}
				name="groupSize"
				placeholder="Group size?"
			/>
			<select name="difficulty" onChange={(e) => formHandler(e)}>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="difficult">Difficult</option>
			</select>
			<input
				type="text"
				value={tour.startLocation.description}
				onChange={(e) => locationHandler(e)}
				name="description"
				placeholder="description of location?"
			/>
			<input
				type="text"
				value={tour.startLocation.address}
				name="address"
				placeholder="address?"
				onChange={(e) => locationHandler(e)}
			/>
			<input
				type="text"
				value={tour.startLocation.coordinates}
				name="coordinates"
				placeholder="coordinates? (lang, lat)"
				onChange={(e) => locationHandler(e)}
			/>
			<input
				type="number"
				value={tour.price}
				onChange={(e) => formHandler(e)}
				name="price"
				placeholder="Price?"
			/>
			<input
				type="text"
				value={tour.summary}
				onChange={(e) => formHandler(e)}
				name="summary"
				placeholder="Summary?"
			/>
			{/* <input
				type="file"
				value={tour.imageCover}
				onChange={(e) => formHandler(e)}
				name="imageCover"
				placeholder="Image cover?"
				accept="image/png, image/jpeg"
			/>
			<input
				type="file"
				value={tour.images}
				onChange={(e) => formHandler(e)}
				name="images"
				placeholder="Images?"
				accept="image/png, image/jpeg"
				multiple
			/> */}
			<input
				type="date"
				name="startDates"
				value={tour.startDates}
				onChange={(e) => formHandler(e)}
				min="2020-01-01"
				max="2025-12-31"
			></input>
			<input type="submit"></input>
		</form>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createTour: (data) => dispatch(actions.addTour(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTourForm)
