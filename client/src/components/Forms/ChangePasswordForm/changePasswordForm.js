import React from "react"

const ChangePasswordForm = (props) => {
	return (
		<form>
			<input
				type="password"
				value={props.currentPassword}
				onChange={props.formHandler}
				name="currentPassword"
				placeholder="Current Password"
			></input>
			<input
				type="password"
				value={props.password}
				onChange={props.formHandler}
				name="password"
				placeholder="New Password.."
			></input>
			<input
				type="password"
				value={props.passwordConfirm}
				onChange={props.formHandler}
				name="passwordConfirm"
				placeholder="Confirm new password.."
			></input>

			<button onClick={props.submitHandler} type="submit">
				Submit
			</button>
		</form>
	)
}

export default ChangePasswordForm
