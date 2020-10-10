import React from "react"
import "./Form.scss"

const Form = (props) => {
	return (
		<form className="form" onSubmit={props.onsubmit}>
			{props.children}
		</form>
	)
}

export default Form
