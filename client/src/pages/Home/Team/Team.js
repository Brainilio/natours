import React from "react"

//photos
import personOne from "../../../resource/person-1.jpg"
import personTwo from "../../../resource/person-2.jpg"
import personThree from "../../../resource/person-3.jpg"
import personFour from "../../../resource/person-4.jpg"

const Team = () => {
	return (
		<section id="our-team" className="meet-the-team">
			<span className="meet-the-team-title">THE TEAM</span>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique
				tempor porta.
			</p>
			<div className="meet-the-team-group">
				<div className="meet-the-team-section-one">
					<div className="single-team-mate">
						<img src={personOne} className="single-team-photo"></img>
						<span className="single-team-name">TAYLOR DOE</span>
					</div>
					<div className="single-team-mate">
						<img src={personTwo} className="single-team-photo"></img>
						<span className="single-team-name">TAYLOR DOE</span>
					</div>
				</div>

				<div className="meet-the-team-section-two">
					<div className="single-team-mate">
						<img src={personThree} className="single-team-photo"></img>
						<span className="single-team-name">TAYLOR DOE</span>
					</div>
					<div className="single-team-mate">
						<img src={personFour} className="single-team-photo"></img>
						<span className="single-team-name">TAYLOR DOE</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Team
