import React from "react"

const ContactForm = () => {
	return (
		<form onSubmit={() => console.log("boom!")}>
			<div className="form-contact-us-title">
				<span className="contact-us-title">CONTACT US</span>
				<span>
					Got any questions? Feel free to reach out. We usually respond in a
					day.
				</span>
			</div>
			<div className="input-items-contact">
				<input placeholder="Your name.." type="text"></input>
				<input placeholder="Your email.." type="text"></input>
				<textarea placeholder="Your message.."></textarea>
				<button type="submit">SUBMIT</button>
			</div>
		</form>
	)
}

export default ContactForm
