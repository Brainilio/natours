import axios from "axios"

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_KEY,
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})

export default instance
