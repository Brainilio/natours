import React from "react"

const SignupForm = (props) => {
	return (
		<form autocomplete="off" className="sign-up-form">
			<span className="signup-title">Sign Up</span>
			<input
				type="text"
				value={props.email}
				onChange={props.formHandler}
				name="email"
				placeholder="Email.."
			></input>
			<input
				type="password"
				value={props.password}
				onChange={props.formHandler}
				name="password"
				placeholder="Password.."
			></input>
			<input
				type="password"
				value={props.passwordConfirm}
				onChange={props.formHandler}
				name="passwordConfirm"
				placeholder="Confirm password.."
			></input>
			<label htmlFor="image">Choose a profile picture:</label>
			<input
				value={props.image}
				onChange={props.formHandler}
				type="file"
				name="image"
				accept="image/png, image/jpeg"
			></input>
			<button onClick={props.submitHandler} type="submit">
				Sign up..
			</button>
			<span onClick={props.toggle} className="switch-login">
				or Login..
			</span>
		</form>
	)
}

export default SignupForm
