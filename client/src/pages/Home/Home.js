import React from "react"
import "./Home.scss"
import Landing from "./Landing/Landing"
import Explore from "./Explore/Explore"
import About from "./About/About"
import Team from "./Team/Team"
import Contact from "./Contact/Contact"
import MarkerPicker from "../../components/MarkerPicker/MarkerPicker"

const Home = () => {
	return (
		<>
			<Landing />
			<Explore />
			<MarkerPicker />
			<div className="banner-hero-image-1"></div>
			<About />
			<div className="banner-hero-image-2"></div>
			<Team />
			<Contact />
		</>
	)
}

export default Home
