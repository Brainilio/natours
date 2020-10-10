import React from "react"
import Backdrop from "../Backdrop/Backdrop"
import "./Modal.scss"

const Modal = (props) => {
	return (
		<>
			<Backdrop show={props.clicked} clicked={props.clicked} />
			<div className="modal">{props.children}</div>
		</>
	)
}
export default Modal
