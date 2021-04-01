import axios from "axios"
// process.env.REACT_APP_API_KEY
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_KEY,
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})

export default instance
