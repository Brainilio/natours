import axios from "axios"

const instance = axios.create({
	baseURL:
		"http://ec2-18-192-13-45.eu-central-1.compute.amazonaws.com:8000/api/v1/",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})

export default instance
