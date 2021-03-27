import React from "react"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"
import ListForReviews from "./ListForReviews"
import "./MyReviews.scss"

const MyReviews = () => {
	return (
		<section className="my-reviews-section">
			<DashboardBanner />
			<ListForReviews />
		</section>
	)
}

export default MyReviews
