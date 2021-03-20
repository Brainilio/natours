import React, { useState } from "react"
import axios from "../../../axios"
const ContactForm = () => {
	const [input, setInput] = useState({
		name: "",
		email: "",
		message: "",
	})
	const [error, setError] = useState(null)
	const [success, onSuccess] = useState(false)

	const inputChangeHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		axios
			.post("contact", input)
			.then((response) => {
				if (response.status == 201) {
					onSuccess(true)
				}
			})
			.catch((error) => setError(error.message))
		console.log(input)
	}
	return (
		<form onSubmit={onSubmit}>
			<div className="form-contact-us-title">
				<span className="contact-us-title">CONTACT US</span>
				<span>
					Got any questions? Feel free to reach out. We usually respond in a
					day.
				</span>
				<span style={{ color: "red", marginTop: "1em" }}>{error}</span>
			</div>
			{success ? (
				<h1 style={{ margin: "2em auto", textAlign: "center" }}>
					Succesfully sent your query!
				</h1>
			) : (
				<div className="input-items-contact">
					<input
						onChange={inputChangeHandler}
						placeholder="Your name.."
						name="name"
						type="text"
					></input>
					<input
						onChange={inputChangeHandler}
						placeholder="Your email.."
						name="email"
						type="text"
					></input>
					<textarea
						onChange={inputChangeHandler}
						placeholder="Your message.."
						name="message"
					></textarea>
					<button type="submit">SUBMIT</button>
				</div>
			)}
		</form>
	)
}

export default ContactForm
