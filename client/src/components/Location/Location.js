import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Location = (props) => {
	const mapContainer = useRef(null)

	const [lng, setLng] = useState(props.location.coordinates[0])
	const [lat, setLat] = useState(props.location.coordinates[1])
	const [zoom, setZoom] = useState(10)

	useEffect(() => {
		var map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10",
			center: [lat, lng],
			zoom: zoom,
		})

		new mapboxgl.Marker().setLngLat([lat, lng]).addTo(map)

		// Add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), "top-right")

		map.on("move", () => {
			setLng(map.getCenter().lng.toFixed(1))
			setLat(map.getCenter().lat.toFixed(1))
			setZoom(map.getZoom().toFixed(1))
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
