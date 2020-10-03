import React from "react"
import Explore from "./Explore/Explore"
import "./Home.scss"
import Landing from "./Landing/Landing"

const Home = () => {
	return (
		<>
			<Landing />
			<Explore />
			<div className="banner-hero-image-1"></div>
			<section className="about-us">
				<span className="about-us-title">WHO ARE WE</span>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
					tristique tempor porta. Integer eleifend tincidunt tortor, eleifend
					consectetur lorem. Nullam nec diam lectus. Mauris vitae convallis
					neque. Orci varius natoque penatibus et magnis dis parturient montes,
					nascetur ridiculus mus. Suspendisse eros nulla, scelerisque nec dui
					at, congue elementum lacus. In hac habitasse platea dictumst.
					Pellentesque venenatis sit amet nisi in maximus. Fusce pharetra eros
					lectus, id rhoncus mi fringilla lobortis. Pellentesque tortor dolor,
					tempus sed semper nec, lobortis sit amet libero.
				</p>

				<div className="images-about-us">
					<div className="image-one-about"></div>
					<div className="image-two-about"></div>
				</div>
			</section>
		</>
	)
}

export default Home
