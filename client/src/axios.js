import axios from "axios"

const instance = axios.create({
	baseURL: "http://159.89.101.212:8000/api/v1/",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})

export default instance
