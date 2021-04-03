import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editTour } from "../../../store/actions"

const TourEdit = (props) => {
	const dispatch = useDispatch()
	const { currentTour } = useSelector((state) => state.tours)
	const [tour, setTour] = useState(null)

	useEffect(() => {
		setTour({
			name: currentTour.name,
			duration: currentTour.duration,
			groupSize: currentTour.groupSize,
			difficulty: currentTour.difficulty,
			price: currentTour.price,
			summary: currentTour.summary,
			startDates: currentTour.startDates,
		})
	}, [props])

	const formHandler = (event) => {
		const name = event.target.name
		let value = event.target.value

		setTour({
			...tour,
			[name]: value,
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		let dataToSend = {}
		for (const item in tour) {
			if (tour[item] && tour[item] !== currentTour[item])
				dataToSend[item] = tour[item]
		}
		dispatch(editTour(props.id, dataToSend))
	}

	return currentTour && tour ? (
		<form className="create-tour-form" onSubmit={formSubmitHandler}>
			<div className="inputs">
				<h1>Edit tour:</h1>
				<div>
					<label htmlFor="name">Tour name:</label>
					<input
						type="text"
						value={tour.name}
						onChange={formHandler}
						name="name"
					/>
				</div>
				<div>
					<label htmlFor="duration">Duration:</label>
					<input
						type="number"
						min="1"
						max="10"
						value={tour.duration}
						onChange={formHandler}
						name="duration"
						placeholder="Tour duration?"
					/>
				</div>

				<div>
					<label htmlFor="groupSize">Group Size:</label>
					<input
						type="number"
						value={tour.groupSize}
						onChange={formHandler}
						name="groupSize"
						placeholder="Group size?"
					/>
				</div>

				<div>
					<label htmlFor="difficulty">Difficulty:</label>
					<select name="difficulty" onChange={formHandler}>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="difficult">Difficult</option>
					</select>
				</div>

				<div>
					<label htmlFor="price">Price:</label>
					<input
						type="number"
						value={tour.price}
						onChange={formHandler}
						name="price"
						placeholder="Price?"
					/>
				</div>

				<div>
					<label htmlFor="summary">Summary:</label>
					<input
						type="text"
						value={tour.summary}
						onChange={formHandler}
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
						onChange={formHandler}
						min="2020-01-01"
						max="2025-12-31"
					></input>
				</div>
			</div>

			<input type="submit" value="Edit Tour"></input>
		</form>
	) : (
		<pre>Loading....</pre>
	)
}

export default TourEdit
