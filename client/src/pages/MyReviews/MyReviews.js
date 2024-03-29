import React from "react"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"
import ListForReviews from "./ListForReviews"
import "./MyReviews.scss"

const MyReviews = () => {
	return (
		<>
			<DashboardBanner />
			<section className="my-reviews-section">
				<ListForReviews />
			</section>
		</>
	)
}

export default MyReviews
