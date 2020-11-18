import React from "react"

const Tab = (props) => {
	//add if click: add classname to current classnames to change color

	return (
		<div className="tab-bar">
			<div className="filter">
				<span className="active" onClick={(val) => props.click("All Tours")}>
					All Tours
				</span>
				<span onClick={(val) => props.click("Top 5 Tours")}> Top 5 Tours</span>
			</div>
			<span className="clickable">Click on tour for more info</span>
		</div>
	)
}

export default Tab
