import React, { useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
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

	const formHandler = (e) => {
		let label = e.target.name
		let value = e.target.value

		setInformation({
			...information,
			[label]: value,
		})
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
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
					<form className="sign-up-form">
						<span className="signup-title">Sign Up</span>

						<input
							type="text"
							value={information.email}
							onChange={(e) => formHandler(e)}
							name="email"
							placeholder="Email.."
						></input>

						<input
							type="password"
							value={information.password}
							onChange={(e) => formHandler(e)}
							name="password"
							placeholder="Password.."
						></input>
						<input
							type="password"
							value={information.passwordConfirm}
							onChange={(e) => formHandler(e)}
							name="passwordConfirm"
							placeholder="Confirm password.."
						></input>
						<label htmlFor="image">Choose a profile picture:</label>

						<input
							type="file"
							name="image"
							accept="image/png, image/jpeg"
						></input>

						<button onClick={(e) => formSubmitHandler(e)} type="submit">
							Sign up..
						</button>
						<span onClick={toggleContent} className="switch-login">
							or Login..
						</span>
					</form>
				) : (
					<form className="login-up-form">
						<span className="login-title">Login</span>
						<input
							type="text"
							value={information.email}
							onChange={(e) => formHandler(e)}
							name="email"
							placeholder="Email.."
						></input>
						<input
							type="password"
							value={information.password}
							onChange={(e) => formHandler(e)}
							name="password"
							placeholder="Password.."
						></input>
						<button onClick={(e) => formSubmitHandler(e)} type="submit">
							Log in
						</button>
						<span onClick={toggleContent} className="switch-login">
							or Sign Up..
						</span>
					</form>
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
