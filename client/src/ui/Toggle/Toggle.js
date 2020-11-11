import React, { useEffect, useState } from "react"

const Toggle = (props) => {
	const [toggle, setToggle] = useState(props.checked)

	const toggleHandler = (state, user) => {
		setToggle(state)
		props.handleChange(!toggle, user)
	}

	return (
		<input
			type="checkbox"
			value={toggle}
			onChange={() => toggleHandler(!toggle, props.user)}
			checked={toggle}
		/>
	)
}

export default Toggle
