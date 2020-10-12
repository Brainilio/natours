import React, { useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
import Loginform from "../../components/Loginform/loginForm"
import SignupForm from "../../components/Signupform/signupForm"
import "./Login.scss"

const Login = (props) => {
	const [isSignUp, setIsSignUp] = useState(false)
	const [information, setInformation] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		image: "",
	})
	const [isauthRedirect, setAuthredirect] = useState(false)

	const toggleContent = () => setIsSignUp((prevState) => !prevState)

	const formHandler = (event) => {
		let label = event.target.name
		let value = event.target.value

		setInformation({
			...information,
			[label]: value,
		})
	}

	const formSubmitHandler = (event) => {
		event.preventDefault()
		let toSend = {}

		// for cleanness: don't send empty labels, just send what contains value
		for (const name in information) {
			if (information[name]) {
				toSend[name] = information[name]
			}
		}

		console.log(toSend, isSignUp)
		setAuthredirect(true)
	}

	let authRedirect = null
	if (isauthRedirect) authRedirect = <Redirect to="/dashboard" />

	return (
		<section className="login-page">
			{authRedirect}
			<div className="auth-content">
				{isSignUp ? (
					<SignupForm
						email={information.email}
						password={information.password}
						passwordConfirm={information.passwordConfirm}
						image={information.image}
						formHandler={formHandler}
						submitHandler={formSubmitHandler}
						toggle={toggleContent}
					/>
				) : (
					<Loginform
						email={information.email}
						password={information.password}
						formHandler={formHandler}
						submitHandler={formSubmitHandler}
						toggle={toggleContent}
					/>
				)}
			</div>
			<div className="login-page-text">
				<span className="login-page-title">NATOURS</span>
				<span className="login-page-motto">Tour Agency</span>
			</div>
		</section>
	)
}

export default Login
