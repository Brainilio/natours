import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import PersonOne from "../../resource/person-1.jpg"
import personTwo from "../../resource/person-2.jpg"
import imageOne from "../../resource/image-carousel-one.jpg"
import imageTwo from "../../resource/image-carousel-two.jpg"
import "./Traveldetail.scss"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import ReviewCard from "../../components/ReviewCard/reviewCard"

const Traveldetail = (props) => {
	const [reviewForm, setreviewForm] = useState(false)

	return (
		<>
			<button className="detail-page-cta">BOOK NOW</button>
			<section className="detail-page-landing">
				<span className="go-back">
					<NavLink to="/"> &lt;</NavLink>
				</span>
				<span className="detail-page-tour-name">RIO DE JANEIRO, BRAZIL</span>
			</section>
			<section className="detail-page-information">
				<div className="detail-page-information-left">
					<ul>
						<li>X: August 21, 2021</li>
						<li>X: 25 People</li>
						<li>X: Medium</li>
						<li>X: 4.5 (35)</li>
					</ul>
				</div>
				<div className="detail-page-information-right">$800</div>
			</section>
			<section className="detail-page-description">
				<span className="header-detail detail-page-description-title">
					Description
				</span>
				<p className="detail-page-description-description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
					tristique tempor porta. Integer eleifend tincidunt tortor, eleifend
					consectetur lorem. Nullam nec diam lectus. Mauris vitae convallis
					neque. Orci varius natoque penatibus et magnis dis parturient montes.
				</p>
			</section>
			<section className="detail-page-guides">
				<span className="header-detail detail-page-description-title">
					Guides
				</span>
				<div className="detail-page-guides-pictures">
					<img src={PersonOne} />
					<img src={personTwo} />
				</div>
			</section>
			<section className="detail-page-images">
				<span className="header-detail detail-page-images-title">Pictures</span>
				<AliceCarousel
					disableButtonsControls={true}
					autoPlay
					autoPlayInterval="3000"
				>
					<img src={imageOne} className="sliderimg" />
					<img src={imageTwo} className="sliderimg" />
				</AliceCarousel>
			</section>
			<section className="detail-page-map">
				<span className="header-detail detail-page-map-title">Location</span>
				<div className="detail-map"></div>
			</section>
			<section className="detail-page-reviews">
				<span className="header-detail detail-page-map-reviews">Reviews</span>
				<ReviewCard />
				<ReviewCard />
			</section>
		</>
	)
}

export default Traveldetail
