import React from "react"
import Background from "../../../resource/backgroundimg.jpg"

const Landing = () => {
	return (
		<section className="home-landing">
			<img
				src={Background}
				className="home-landing-picture"
				alt="backgroundimage"
			/>
			<div className="home-landing-text">
				<span className="home-landing-title">NATOURS</span>
				<span className="home-landing-motto">Tour Agency</span>
			</div>
			<div className="home-landing-cta">
				<button className="home-landing-button">Explore</button>
				<span className="home-landing-button-pointer"></span>
			</div>
		</section>
	)
}

export default Landing
