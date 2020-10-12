import React from "react"
import Explore from "./Explore/Explore"
import "./Home.scss"
import Landing from "./Landing/Landing"

import About from "./About/About"
import Team from "./Team/Team"
import Contact from "./Contact/Contact"

const Home = () => {
	return (
		<>
			<Landing />
			<Explore />
			<div className="banner-hero-image-1"></div>
			<About />
			<div className="banner-hero-image-2"></div>
			<Team />
			<Contact />
		</>
	)
}

export default Home
