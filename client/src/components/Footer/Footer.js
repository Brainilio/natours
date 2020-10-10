import React from "react"
import "./Footer.scss"

const Footer = () => {
	return (
		<footer>
			<div className="footer-content">
				<div className="footer-first-half">
					<div className="footer-first-half-brand">
						<ul>
							<li>
								<span>NATOURS</span>
							</li>
							<li>Tours</li>
							<li>About</li>
							<li>Meet The Team</li>
							<li>Contact us</li>
						</ul>
					</div>
					<div className="footer-first-half-socials">
						<span>Find us on</span>
						<div>
							<ul>
								<li>
									<span aria-hidden className="material-icons">
										facebook
									</span>
								</li>
								<li>
									<span aria-hidden className="material-icons">
										facebook
									</span>
								</li>
								<li>
									<span aria-hidden className="material-icons">
										facebook
									</span>
								</li>
								<li>
									<span aria-hidden className="material-icons">
										facebook
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer-second-half">
					<div className="footer-second-half-address">
						<p>
							Natours <br />
							California St 123, <br />
							San Francisco, California <br />
							USA
						</p>
					</div>
					<div className="footer-second-half-company">
						<span>Company</span>
						<ul>
							<li>Become a guide</li>
							<li>Careers</li>
							<li>Privacy Statement</li>
							<li>Sitemap</li>
						</ul>
					</div>
				</div>
			</div>
			<span className="developed-by">Developed and designed by Brainilio</span>
		</footer>
	)
}

export default Footer
