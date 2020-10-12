import React, { useEffect } from "react"
import "./Home.scss"
import axios from "axios"

import Landing from "./Landing/Landing"
import Explore from "./Explore/Explore"
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
