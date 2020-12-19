import React from "react"

const Loginform = (props) => {
	return (
		<form autocomplete="off" className="login-up-form">
			<span className="login-title">Login</span>
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
			<button onClick={props.submitHandler} type="submit">
				Log in
			</button>
			<span onClick={props.toggle} className="switch-login">
				or Sign Up..
			</span>
		</form>
	)
}

export default Loginform
