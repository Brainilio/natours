import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "./MarkerPicker.scss"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const MarkerPicker = (props) => {
	const mapContainer = useRef(null)
	const [selectedLocation, setSelectedLocation] = useState({
		coordinates: null,
		address: null,
	})

	const confirmLocation = () => {
		props.sendLocation(selectedLocation)
		props.cancel()
	}

	useEffect(() => {
		setSelectedLocation({
			coordinates: props.currentLocation.coordinates.reverse(),
			address: props.currentLocation.address,
		})
		let map = new mapboxgl.Map({
			container: mapContainer.current, // Container ID
			style: "mapbox://styles/mapbox/streets-v11", // Map style to use
			center: props.currentLocation.coordinates, // Starting position [lng, lat]
			zoom: 12, // Starting zoom level
		})

		var geocoder = new MapboxGeocoder({
			// Initialize the geocoder
			accessToken: mapboxgl.accessToken, // Set the access token
			placeholder: "Search for a location", // Placeholder text for the search bar
			mapboxgl: mapboxgl, // Set the mapbox-gl instance
			marker: true, // Do not use the default marker style
		})

		// Add the geocoder to the map
		map.addControl(geocoder)

		map.addControl(new mapboxgl.NavigationControl())

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
				setSelectedLocation({
					...selectedLocation,
					coordinates: e.result.geometry.coordinates,
					address: e.result.place_name,
				})
				console.log(e.result)
				map.getSource("single-point").setData(e.result.geometry)
			})
		})

		return () => map.remove()
	}, [])
	return (
		<section className="location-picker">
			<div ref={mapContainer} className="location-map"></div>
			{!selectedLocation.coordinates && !selectedLocation.address ? (
				<span>Please select a location!</span>
			) : (
				<span>
					<span style={{ color: "black" }}>You've selected:</span>
					{selectedLocation.address}.
					<span style={{ color: "black" }}>
						Confirm location or search for new location.
					</span>
				</span>
			)}

			<div className="location-buttons">
				<button
					className="confirm"
					type="button"
					disabled={
						selectedLocation.coordinates && selectedLocation.address
							? false
							: true
					}
					onClick={confirmLocation}
				>
					Confirm location
				</button>
				<button type="button" onClick={() => props.cancel()}>
					Go Back
				</button>
			</div>
		</section>
	)
}

export default MarkerPicker
