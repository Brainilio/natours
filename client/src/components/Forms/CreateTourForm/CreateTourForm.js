import React, { useEffect, useState } from "react"
import * as actions from "../../../store/actions/index"
import { connect, useDispatch, useSelector } from "react-redux"
import Spinner from "../../Spinner/Spinner"
import { stopLoading } from "../../../store/actions/admin"
import MarkerPicker from "../../MarkerPicker/MarkerPicker"

const CreateTourForm = (props) => {
	const dispatch = useDispatch()

	const { loadTours, error, closeFormModal } = useSelector(
		(state) => state.tours
	)
	const [locationPicker, setLocationPicker] = useState(false)
	const { userId } = useSelector((state) => state.auth)
	const [tour, setTour] = useState({
		name: "",
		imageCover: null,
		images: null,
		duration: 8,
		groupSize: 25,
		difficulty: "easy",
		guides: [userId],
		startLocation: {
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia pellentesque erat et faucibus.",
			coordinates: [25.792861, -80.234185],
			address: "10th Lorem Ipsum Street, hi",
		},
		price: 300,
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia pellentesque erat et faucibus. Sed ac blandit ipsum. Mauris mollis auctor dictum. Duis in pharetra nibh, eu feugiat tortor.",
		startDates: "",
	})
	useEffect(() => {
		if (closeFormModal === true) {
			props.addHandler()
		}
	}, [closeFormModal])

	const sendLocation = (location) => {
		location.coordinates.reverse()

		setTour({
			...tour,
			startLocation: {
				...tour.startLocation,
				...location,
			},
		})
	}

	const handleLocationPicker = (e) => {
		setLocationPicker((prevstate) => !prevstate)
	}

	const formHandler = (e) => {
		const name = e.target.name
		let value = e.target.value

		if (name == "images") {
			if (tour.images && tour.images.length > 1) {
				let newArray = [...tour.images]
				newArray.push(e.target.files)
				setTour({
					...tour,
					[name]: newArray,
				})
			} else {
				let newArray = []
				newArray.push(e.target.files)
				setTour({
					...tour,
					[name]: newArray,
				})
			}
		} else if (name == "imageCover") {
			let image = e.target.files[0]
			value = image

			setTour({
				...tour,
				[name]: value,
			})
		} else {
			setTour({
				...tour,
				[name]: value,
			})
		}
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		let dataToSend = {}
		for (const item in tour) {
			if (tour[item]) dataToSend[item] = tour[item]
		}

		if (dataToSend.images) dataToSend.images = dataToSend.images[0]

		props.createTour(dataToSend)
	}

	return (
		<form className="create-tour-form" onSubmit={(e) => formSubmitHandler(e)}>
			{locationPicker ? <h1>Pick location: </h1> : <h1>Create new tour:</h1>}
			<span style={{ color: "red" }} onClick={() => dispatch(stopLoading())}>
				{error}
			</span>
			{loadTours ? (
				<Spinner />
			) : locationPicker ? (
				<MarkerPicker
					sendLocation={sendLocation}
					cancel={handleLocationPicker}
					currentLocation={tour.startLocation}
				/>
			) : (
				<>
					<div className="inputs">
						<div>
							<label htmlFor="name">Tour name:</label>
							<input
								type="text"
								value={tour.name}
								onChange={(e) => formHandler(e)}
								name="name"
							/>
						</div>

						<div>
							<label htmlFor="imageCover">Cover image:</label>
							<input
								onChange={(e) => formHandler(e)}
								type="file"
								name="imageCover"
								accept="image/*"
							></input>
						</div>
						<div>
							<label htmlFor="images">Images (choose up to 3):</label>
							<input
								onChange={(e) => formHandler(e)}
								type="file"
								name="images"
								accept="image/*"
								multiple
							></input>
						</div>

						<div>
							<label htmlFor="duration">Duration:</label>
							<input
								type="number"
								min="1"
								max="10"
								value={tour.duration}
								onChange={(e) => formHandler(e)}
								name="duration"
								placeholder="Tour duration?"
							/>
						</div>

						<div>
							<label htmlFor="groupSize">Group Size:</label>
							<input
								type="number"
								value={tour.groupSize}
								onChange={(e) => formHandler(e)}
								name="groupSize"
								placeholder="Group size?"
							/>
						</div>

						<div>
							<label htmlFor="difficulty">Difficulty:</label>
							<select name="difficulty" onChange={(e) => formHandler(e)}>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="difficult">Difficult</option>
							</select>
						</div>

						<div>
							<label htmlFor="address">Location:</label>
							{tour.startLocation.address ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<span>{tour.startLocation.address.slice(0, 8)}...</span>
									<button onClick={handleLocationPicker}>
										Get new location
									</button>
								</div>
							) : (
								<button onClick={handleLocationPicker}>
									Look for Location
								</button>
							)}
						</div>

						<div>
							<label htmlFor="price">Price:</label>
							<input
								type="number"
								value={tour.price}
								onChange={(e) => formHandler(e)}
								name="price"
								placeholder="Price?"
							/>
						</div>

						<div>
							<label htmlFor="summary">Summary:</label>
							<input
								type="text"
								value={tour.summary}
								onChange={(e) => formHandler(e)}
								name="summary"
								placeholder="Summary?"
							/>
						</div>

						<div>
							<label htmlFor="startDates">Start date:</label>
							<input
								type="date"
								name="startDates"
								value={tour.startDates}
								onChange={(e) => formHandler(e)}
								min="2020-01-01"
								max="2025-12-31"
							></input>
						</div>
					</div>
					<input type="submit" value="Add Tour"></input>
				</>
			)}
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
