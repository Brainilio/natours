import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const MarkerPicker = (props) => {
	const mapContainer = useRef(null)
	const [coordinates, setCoordinates] = useState([-122.25948, 37.87221])

	const confirmLocation = () => {
		props.sendLocation(coordinates)
	}

	useEffect(() => {
		let map = new mapboxgl.Map({
			container: mapContainer.current, // Container ID
			style: "mapbox://styles/mapbox/streets-v11", // Map style to use
			center: [-122.25948, 37.87221], // Starting position [lng, lat]
			zoom: 12, // Starting zoom level
		})

		var geocoder = new MapboxGeocoder({
			// Initialize the geocoder
			accessToken: mapboxgl.accessToken, // Set the access token
			placeholder: "Search for places in Berkeley", // Placeholder text for the search bar
			mapboxgl: mapboxgl, // Set the mapbox-gl instance
			marker: false, // Do not use the default marker style
		})

		// Add the geocoder to the map
		map.addControl(geocoder)

		map.on("load", function () {
			map.addSource("single-point", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			map.addLayer({
				id: "point",
				source: "single-point",
				type: "circle",
				paint: {
					"circle-radius": 10,
					"circle-color": "#448ee4",
				},
			})

			// Listen for the `result` event from the Geocoder
			// `result` event is triggered when a user makes a selection
			//  Add a marker at the result's coordinates
			geocoder.on("result", function (e) {
				setCoordinates(e.result.geometry.coordinates)
				map.getSource("single-point").setData(e.result.geometry)
			})
		})

		return () => map.remove()
	}, [])
	return (
		<section className="detail-page-map">
			<span className="header-detail detail-page-map-title">Location</span>
			<div ref={mapContainer} className="detail-map"></div>
			<button onClick={confirmLocation}>Confirm location</button>
		</section>
	)
}

export default MarkerPicker
