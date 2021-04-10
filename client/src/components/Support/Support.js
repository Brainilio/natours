import React from "react"
import "./Support.scss"
import supportphoto from "../../resource/support-photo.png"
import phone from "../../resource/phone.png"
import livechat from "../../resource/livechat.png"
import email from "../../resource/email.png"
const Support = () => {
	return (
		<div className="contact-support">
			<div className="cs-left">
				<div className="cs-left-header">
					<h1>Contact Support</h1>
					<span>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						tristique tempor porta.
					</span>
				</div>
				<div className="cs-left-body">
					<div>
						<img src={phone} />
						<span>+1 (404) 123-4567</span>
					</div>
					<div>
						<img src={email} />
						<span>customersupport@natours.com</span>
					</div>
					<div>
						<img src={livechat} />
						<span>Live Chat (24 hours)</span>
					</div>
				</div>
				<div className="cs-left-footer">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						tristique tempor porta.
					</p>
				</div>
			</div>

			<div className="cs-right"></div>
		</div>
	)
}

export default Support
