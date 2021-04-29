import React from "react"
import Background from "../../../resource/backgroundimg.jpg"
import DesktopBg from "../../../resource/backgroundDesktop.png"
import Partners from "../../../resource/partners.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import TravelCard from "../../../components/TravelCards/TravelCard"

const Landing = () => {
	const { allTours } = useSelector((state) => state.tours)
	return (
		<section className="home-landing">
			<img
				src={Background}
				className="home-landing-picture-landing-dont-touch"
				style={{ opacity: "60%" }}
				alt="backgroundimage"
			/>
			<img
				src={DesktopBg}
				className="home-landing-picture-desktop-landing-dont-touch"
				alt="backgroundimage"
				width="100%"
			/>
			<div className="home-landing-items">
				<div className="home-landing-text">
					<span className="home-landing-title">NATOURS</span>
					<span className="home-landing-motto">Tour Agency</span>
					<p>Explore new destinations! Book with us and book it out of here.</p>
				</div>
				<div className="home-landing-cta">
					<button className="home-landing-button">Explore Now</button>
					<Link to="/login">
						<button className="home-login-button">Log in</button>
					</Link>
					<span className="home-landing-button-pointer"></span>
				</div>
			</div>
			<div className="home-landing-desktop-projects">
				{allTours
					? allTours
							.slice(0, 2)
							.map((tour) => <TravelCard key={tour._id} tour={tour} />)
					: null}
			</div>

			<img
				src={Partners}
				className="home-landing-picture-partners"
				alt="backgroundimage"
				width="60%"
			/>
		</section>
	)
}

export default Landing
