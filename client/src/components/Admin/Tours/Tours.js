import React, { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import "./Tours.scss"
import * as actions from "../../../store/actions/"
import Modal from "../../../ui/Modal/Modal"
import TourEdit from "./TourEdit"
import DashboardBanner from "../../DashboardBanner/DashboardBanner"
import TourBar from "./TourBar"
import CreateTourForm from "../../Forms/CreateTourForm/CreateTourForm"

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
	const dispatch = useDispatch()
	const { currentTour } = useSelector((state) => state.tours)

	const [edit, setEdit] = useState(false)
	const [add, setAdd] = useState(false)
	const [id, setId] = useState(null)

	const addHandler = () => setAdd((prevstate) => !prevstate)

	const editHandler = (givenid) => {
		if (givenid == null) {
			setId(null)
		} else {
			dispatch(actions.fetchSingleTour(givenid))
			setId(givenid)
			setEdit((prevstate) => !prevstate)
		}
	}

	let tours = null

	if (props.allTours) {
		tours = props.allTours.map((tour) => (
			<TourBar
				key={tour._id}
				tour={tour}
				edit={edit}
				editHandler={editHandler}
				deleteTour={props.deleteTour}
			/>
		))
	}

	return (
		<>
			<DashboardBanner />
			<section className="admin-tours-section">
				<span className="admin-tours-title">All tours</span>
				<button
					className="admin-add-tour"
					onClick={() => addHandler((prevState) => !prevState)}
				>
					Add Tour
				</button>
				{tours ? tours : null}
			</section>

			{add ? (
				<Modal clicked={addHandler}>
					<CreateTourForm />
				</Modal>
			) : null}

			{edit && currentTour ? (
				<Modal clicked={editHandler}>
					<TourEdit id={id} />
				</Modal>
			) : null}
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
		deleteTour: (id) => dispatch(actions.deleteTour(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Tours))
