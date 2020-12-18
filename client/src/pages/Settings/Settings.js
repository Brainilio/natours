import React, { useState } from "react"
import "./Settings.scss"
import EditProfileForm from "../../components/Forms/EditProfileform/editProfileForm"
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm/changePasswordForm"
import * as actions from "../../store/actions"
import { connect } from "react-redux"
import DashboardBanner from "../../components/DashboardBanner/DashboardBanner"

const Settings = (props) => {
	const [newSettings, setNewSettings] = useState({
		name: props.currentUser,
		email: props.currentUser,
		currentPassword: "",
		password: "",
		passwordConfirm: "",
		image: "",
	})

	const formHandler = (event) => {
		let label = event.target.name
		let value = event.target.value

		if (label === "image") {
			console.log("yes, this is an image!")
			let image = event.target.files[0]
			value = image
		}

		setNewSettings({
			...newSettings,
			[label]: value,
		})
	}

	const formSubmitHandler = (event) => {
		event.preventDefault()
		let toSend = {}

		// for cleanness: don't send empty labels, just send what contains value
		for (const name in newSettings) {
			if (newSettings[name]) {
				toSend[name] = newSettings[name]
			}
		}

		props.onSubmitForm(toSend)

		setNewSettings({
			name: "",
			email: "",
			currentPassword: "",
			password: "",
			passwordConfirm: "",
			image: "",
		})
	}

	const deactivateAccount = (e) => console.log("Deactivating account...")

	return (
		<>
			<DashboardBanner />
			<section className="edit-profile-section">
				<span className="header-title-page-settings">Edit Profile</span>
				<EditProfileForm
					name={newSettings.name}
					email={newSettings.email}
					image={newSettings.image}
					photo={props.photo}
					formHandler={formHandler}
					submitHandler={formSubmitHandler}
				/>
			</section>
			<hr className="solid" style={{ width: "95%" }} />
			<section className="changepassword-profile-section">
				<span className="header-title-page-settings">Change Password</span>
				<ChangePasswordForm
					currentPassword={newSettings.currentPassword}
					password={newSettings.password}
					passwordConfirm={newSettings.passwordConfirm}
					formHandler={formHandler}
					submitHandler={formSubmitHandler}
				/>
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

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth.user,
		photo: state.auth.photo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (dataToChange) =>
			dispatch(actions.authChangeProfile(dataToChange)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
