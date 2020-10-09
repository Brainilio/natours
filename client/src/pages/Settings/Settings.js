import React, { useState } from "react"
import "./Settings.scss"
import person from "../../resource/person.jpg"
import { NavLink } from "react-router-dom"

const Settings = () => {
	const [newSettings, setNewSettings] = useState({
		name: "",
		email: "",
		currentPassword: "",
		password: "",
		passwordConfirm: "",
		image: "",
	})

	const formHandler = (e) => {
		let label = e.target.name
		let value = e.target.value

		setNewSettings({
			...newSettings,
			[label]: value,
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
		e.preventDefault()
		let toSend = {}

		// for cleanness: don't send empty labels, just send what contains value
		for (const name in newSettings) {
			if (newSettings[name]) {
				toSend[name] = newSettings[name]
			}
		}

		console.log(toSend)
	}

	const deactivateAccount = (e) => console.log("Deactivating account...")

	return (
		<>
			<section className="dashboard-page">
				<div className="dashboard-actions">
					<ul>
						<NavLink to="/dashboard">
							<li>&lt;</li>
						</NavLink>
					</ul>
				</div>
				<div className="dashboard-user">
					<img src={person} />
					<span>Hi, Christian!</span>
				</div>
			</section>
			<section className="edit-profile-section">
				<span className="header-title-page-settings">Edit Profile</span>
				<form>
					<input
						type="text"
						value={newSettings.name}
						onChange={(e) => formHandler(e)}
						name="name"
						placeholder="Name.."
					></input>
					<input
						type="text"
						value={newSettings.email}
						onChange={(e) => formHandler(e)}
						name="email"
						placeholder="Email.."
					></input>
					<div>
						<img src={person} />
						<input
							type="file"
							name="image"
							accept="image/png, image/jpeg"
						></input>
					</div>
					<button onClick={(e) => formSubmitHandler(e)} type="submit">
						Save settings
					</button>
				</form>
			</section>
			<hr className="solid" style={{ width: "95%" }} />
			<section className="changepassword-profile-section">
				<span className="header-title-page-settings">Change Password</span>
				<form>
					<input
						type="password"
						value={newSettings.currentPassword}
						onChange={(e) => formHandler(e)}
						name="currentPassword"
						placeholder="Current Password"
					></input>
					<input
						type="password"
						value={newSettings.password}
						onChange={(e) => formHandler(e)}
						name="password"
						placeholder="New Password.."
					></input>
					<input
						type="password"
						value={newSettings.passwordCOnfirm}
						onChange={(e) => formHandler(e)}
						name="passwordCOnfirm"
						placeholder="Confirm new password.."
					></input>

					<button onClick={(e) => formSubmitHandler(e)} type="submit">
						Submit
					</button>
				</form>
			</section>
			<hr className="solid" style={{ width: "95%" }} />
			<section className="deactivate-profile-section">
				<span className="header-title-page-settings">Deactivate account</span>
				<button onClick={(e) => deactivateAccount(e)} type="submit">
					Deactivate account
				</button>
			</section>
		</>
	)
}

export default Settings
