import React from "react"
import Stats from "../../components/Admin/Stats/Stats"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"

const Statistics = () => {
	return (
		<section className="statistics-page">
			<DashboardBanner />
			<Stats />
		</section>
	)
}

export default Statistics
