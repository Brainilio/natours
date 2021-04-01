import React from "react"
import Background from "../../../resource/backgroundimg.jpg"
import { Link } from "react-router-dom"

const Landing = () => {
	return (
		<section className="home-landing">
			<img
				src={Background}
				className="home-landing-picture-landing-dont-touch"
				style={{ opacity: "60%" }}
				alt="backgroundimage"
			/>
			<div className="home-landing-text">
				<span className="home-landing-title">NATOURS</span>
				<span className="home-landing-motto">Tour Agency</span>
			</div>
			<div className="home-landing-cta">
				<button className="home-landing-button">Explore Now</button>
				<Link to="/login">
					<button className="home-login-button">Log in</button>
				</Link>
				<span className="home-landing-button-pointer"></span>
			</div>
		</section>
	)
}

export default Landing
