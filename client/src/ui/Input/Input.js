import React from "react"
import "./Input.scss"

const Input = (props) => {
	return (
		<input
			type={props.type}
			value={props.value}
			onChange={(e) => props.onchange(e)}
			name={props.name}
			placeholder={props.placeholder}
		></input>
	)
}

export default Input
