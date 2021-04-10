import React from "react"
import "./TourAdvice.scss"

const TourAdvice = () => {
	return (
		<div className="travel-advice">
			<div className="travel-advice-single">
				<div className="travel-advice-single-left"></div>
				<div className="travel-advice-single-right">
					<h1>Pack a towel</h1>
					<p>
						While many hostels offer towels, you never know and carrying a small
						towel won’t add that much weight to your bag.
					</p>
				</div>
			</div>
			<div className="travel-advice-single">
				<div className="travel-advice-single-left"></div>
				<div className="travel-advice-single-right">
					<h1>Take an extra bank card and credit card with you</h1>
					<p>
						It’s always good to have a backup in case you get robbed or lose a
						card.You don’t want to be stuck somewhere new without access to your
						funds.
					</p>
				</div>
			</div>
			<div className="travel-advice-single">
				<div className="travel-advice-single-left"></div>
				<div className="travel-advice-single-right">
					<h1>Always carry a lock.</h1>
					<p>
						They come in handy, especially when you stay in dorms and need to
						lock your stuff up.
					</p>
				</div>
			</div>
			<div className="travel-advice-single">
				<div className="travel-advice-single-left"></div>
				<div className="travel-advice-single-right">
					<h1>Pack a flashlight.</h1>
					<p>
						It will let you see at night, you avoid stepping on stuff, and help
						you tell ghost stories.
					</p>
				</div>
			</div>
		</div>
	)
}

export default TourAdvice
