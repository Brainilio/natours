import React, { useEffect, useState } from "react"

const Tab = (props) => {
	//add if click: add classname to current classnames to change color
	const [activeone, setactiveone] = useState(true)
	const [activetwo, setactivetwo] = useState(false)

	const handleClickOne = () => {
		setactiveone(true)
		setactivetwo(false)
		props.click("All Tours")
	}

	const handleClickTwo = () => {
		setactiveone(false)
		setactivetwo(true)
		props.click("Top 5 Tours")
	}

	return (
		<div className="tab-bar">
			<div className="filter">
				<span
					className={activeone ? "active" : "regular"}
					onClick={handleClickOne}
				>
					All Tours
				</span>
				<span
					className={activetwo ? "active" : "regular"}
					onClick={handleClickTwo}
				>
					Top 5 Tours
				</span>
			</div>
			<span className="clickable">Click on a tour for more info</span>
		</div>
	)
}

export default Tab
