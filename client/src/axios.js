import axios from "axios"
// process.env.REACT_APP_API_KEY
const instance = axios.create({
	baseURL: "http://localhost:8000/api/v1/",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})

export default instance
