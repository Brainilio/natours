import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken =
	"pk.eyJ1IjoiYnJhaW5pbGlvIiwiYSI6ImNrZzZyeGNiZTAwY3AycWxtY2M2YWpnMjIifQ.TatHN9lbqKZC97LtzIlIBw"

const Location = (props) => {
	const mapContainer = useRef(null)

	const [lng, setLng] = useState(props.location.coordinates[0])
	const [lat, setLat] = useState(props.location.coordinates[1])
	const [zoom, setZoom] = useState(8)

	useEffect(() => {
		var map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10",
			center: [lng, lat],
			zoom: zoom,
		})

		var marker = new mapboxgl.Marker()
			.setLngLat([props.location.coordinates[0], props.location.coordinates[1]])
			.addTo(map)

		// Add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), "top-right")

		map.on("move", () => {
			setLng(map.getCenter().lng.toFixed(4))
			setLat(map.getCenter().lat.toFixed(4))
			setZoom(map.getZoom().toFixed(2))
		})

		return () => map.remove()
	}, [])

	return (
		<section className="detail-page-map">
			<span className="header-detail detail-page-map-title">Location</span>
			<div ref={mapContainer} className="detail-map"></div>
		</section>
	)
}

export default Location
