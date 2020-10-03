import React from "react"

const Search = (props) => {
	return (
		<form onSubmit={(e) => props.submit(e)}>
			<input
				className="explore-search-bar"
				placeholder="Search for your tour.."
				value={props.value}
				onChange={(e) => props.change(e)}
			></input>
		</form>
	)
}

export default Search
