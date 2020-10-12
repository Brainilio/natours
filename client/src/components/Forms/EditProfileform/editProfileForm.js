import React from "react"
import person from "../../../resource/person.jpg"

const EditProfileForm = (props) => {
	return (
		<form>
			<input
				type="text"
				value={props.name}
				onChange={props.formHandler}
				name="name"
				placeholder="Name.."
			></input>
			<input
				type="text"
				value={props.email}
				onChange={props.formHandler}
				name="email"
				placeholder="Email.."
			></input>
			<div>
				<img src={person} />
				<input
					value={props.image}
					onChange={props.formHandler}
					type="file"
					name="image"
					accept="image/png, image/jpeg"
				></input>
			</div>
			<button onClick={props.submitHandler} type="submit">
				Save settings
			</button>
		</form>
	)
}

export default EditProfileForm
