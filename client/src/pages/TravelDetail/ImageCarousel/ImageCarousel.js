import React from "react"
import imageOne from "../../../resource/image-carousel-one.jpg"
import imageTwo from "../../../resource/image-carousel-two.jpg"
import AliceCarousel from "react-alice-carousel"

const ImageCarousel = (props) => {
	return (
		<section className="detail-page-images">
			<span className="header-detail detail-page-images-title">Pictures</span>
			<AliceCarousel
				disableButtonsControls={true}
				autoPlay
				autoPlayInterval="1500"
			>
				{props.images.map((i) => (
					<img key={i} src={i} className="sliderimg" />
				))}
			</AliceCarousel>
		</section>
	)
}

export default ImageCarousel
