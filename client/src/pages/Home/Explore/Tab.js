import React from "react"

const Tab = (props) => {
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
