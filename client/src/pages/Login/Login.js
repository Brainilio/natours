import React, { useState, useEffect } from "react"
import { NavLink, Redirect } from "react-router-dom"
import Loginform from "../../components/Forms/Loginform/loginForm"
import SignupForm from "../../components/Forms/Signupform/signupForm"
import "./Login.scss"
import * as actions from "../../store/actions/index"
import { connect, useSelector } from "react-redux"
import Spinner from "../../components/Spinner/Spinner"

const Login = (props) => {
	// useEffect(() => {
	// 	props.tryAutoSignUp()
	// }, [])
	const { loading, error } = useSelector((state) => state.auth)

	const [isSignUp, setIsSignUp] = useState(false)
	const [information, setInformation] = useState({
		name: "User",
		email: "admin@admin.com",
		password: "admin123",
		passwordConfirm: "",
		image: "",
	})
	const [isauthRedirect, setAuthredirect] = useState(false)

	const toggleContent = () => setIsSignUp((prevState) => !prevState)

	const formHandler = (event) => {
		let label = event.target.name
		let value = event.target.value

		if (label == "image") {
			let image = event.target.files[0]
			value = image
		}

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

		props.onAuthentication(toSend, isSignUp)
	}

	let authRedirect = null
	if (props.authRedirect) authRedirect = <Redirect to="/dashboard" />

	return (
		<section className="login-page">
			{authRedirect}
			<div className="auth-content">
				{loading ? (
					<Spinner />
				) : isSignUp ? (
					<SignupForm
						name={information.name}
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

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		authRedirect: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		tryAutoSignUp: () => dispatch(actions.checkAuth()),
		onAuthentication: (userData, isSignUp) =>
			dispatch(actions.auth(userData, isSignUp)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
