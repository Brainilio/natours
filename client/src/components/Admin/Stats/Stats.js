import React from "react"
import "./Stats.scss"
import DashboardBanner from "../../DashboardBanner/DashboardBanner"
import { Doughnut } from "@reactchartjs/react-chart.js"

const Stats = () => {
	const data = {
		labels: ["Nepal", "Rio De Janeiro", "Guadalajara"],
		datasets: [
			{
				label: "# of Votes",
				data: [30, 19, 3],
				backgroundColor: ["#3c88c9", "#486b8a", "#4c8ba8"],

				borderWidth: 0,
			},
		],
	}

	return (
		<section className="statistics">
			<Doughnut data={data} width={"300px"} height={"300px"} />
		</section>
	)
}

export default Stats
