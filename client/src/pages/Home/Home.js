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
			<div className="banner-hero-image-2"></div>
			<section className="meet-the-team">
				<span className="meet-the-team-title">MEET THE TEAM</span>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
					tristique tempor porta.
				</p>
				<div className="meet-the-team-group">
					<div className="meet-the-team-section-one">
						<div className="single-team-mate">
							<div className="single-team-photo"></div>
							<span className="single-team-name">TAYLOR DOE</span>
						</div>
						<div className="single-team-mate">
							<div className="single-team-photo"></div>
							<span className="single-team-name">TAYLOR DOE</span>
						</div>
					</div>

					<div className="meet-the-team-section-two">
						<div className="single-team-mate">
							<div className="single-team-photo"></div>
							<span className="single-team-name">TAYLOR DOE</span>
						</div>
						<div className="single-team-mate">
							<div className="single-team-photo"></div>
							<span className="single-team-name">TAYLOR DOE</span>
						</div>
					</div>
				</div>
			</section>
			<section className="contact-us">
				<div className="form-contact-us">
					<form onSubmit={() => console.log("boom!")}>
						<div className="form-contact-us-title">
							<span className="contact-us-title">CONTACT US</span>
							<span>
								Got any questions? Feel free to reach out. We usually respond in
								a day.
							</span>
						</div>
						<div className="input-items-contact">
							<input type="text"></input>
							<input type="text"></input>
							<textarea></textarea>
							<button type="submit">SUBMIT</button>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default Home
