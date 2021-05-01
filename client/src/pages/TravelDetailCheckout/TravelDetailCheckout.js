import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleTour } from "../../store/actions"
import Spinner from "../../components/Spinner/Spinner"
import Modal from "../../ui/Modal/Modal"
import { loadStripe } from "@stripe/stripe-js"
import "./TravelDetailCheckout.scss"
import axios from "../../axios"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import successGif from "../../resource/travelsuccess.gif"
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY)

const Message = ({ message, status }) => (
	<section className="travel-detail-message-page">
		<div className="travel-detail-message-page-background"></div>
		{status === "failed" ? (
			<div className="message-box-failed">
				<h1>Order canceled:</h1>
				<p>{message}</p>
				<Link to="/">Go back home</Link>
			</div>
		) : (
			<div className="message-box-success">
				<h1>Welcome aboard!</h1>
				<img src={successGif} width="100px" />
				<p>{message}</p>
				<Link to="/dashboard">
					<button>Go to dashboard</button>
				</Link>
			</div>
		)}
	</section>
)

const TravelDetailCheckout = (props) => {
	const history = useHistory()
	const [message, setMessage] = useState(null)
	const dispatch = useDispatch()
	const [stripeLoading, setStripeLoading] = useState(false)
	const { loadCurrentTour, currentTour, error } = useSelector(
		(state) => state.tours
	)
	const { name } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(fetchSingleTour(props.match.params.id))
		const query = new URLSearchParams(window.location.search)
		console.log(query)
		if (query.get("success")) {
			setMessage({
				status: "success",
				message:
					"Woohoo! Order placed! You will receive an email confirmation with more details in regards to your travel. We recommend that go to your dashboard to prepare for your travel! We'll get in touch soon with next steps!",
			})
		}

		if (query.get("canceled")) {
			setMessage({
				status: "failed",
				message:
					"Order canceled -- continue to explore around and checkout when you're ready.",
			})
		}
	}, [])

	const handleClick = async (event) => {
		setStripeLoading(true)
		const stripe = await stripePromise
		try {
			axios
				.post(
					`booking/checkout-session/${currentTour.id}?cancelurl=${window.location.href}?canceled=true&successurl=${window.location.href}?success=true`
				)
				.then((response) => {
					const session = response.data.session
					setStripeLoading(false)
					stripe
						.redirectToCheckout({
							sessionId: session.id,
						})
						.catch((error) => console.log(error.message))
				})
				.catch((err) => setStripeLoading(false))
		} catch (err) {
			setStripeLoading(false)
		}

		// When the customer clicks on the button, redirect them to Checkout.
	}

	return (
		<section className="travel-detail-checkout-page">
			{loadCurrentTour ? <Spinner /> : null}
			{currentTour ? (
				message ? (
					<Message message={message.message} status={message.status} />
				) : (
					<div className="travel-detail-checkout">
						<div
							className="td-header"
							style={{
								background: `url(${currentTour.imageCover}) center/cover`,
							}}
						>
							<h1>Checkout</h1>
							<h3>We're so happy to have you on board, {name}!</h3>
						</div>

						<div className="td-body">
							<div className="td-body-header">
								<h3>Summary</h3>
								<p>
									Please review the details down below and proceed with payment.
									Questions? Feel free to contact us!
								</p>
							</div>
							<div className="td-body-body">
								<div>
									<h4>Tour name:</h4>
									<span>{currentTour.name}</span>
								</div>

								<div>
									<h4>Location:</h4>
									<span>{currentTour.startLocation.address}</span>
								</div>

								<div>
									<h4>Start date:</h4>
									<span>
										{dayjs(currentTour.startDate).format("dddd, MMMM D YYYY")}
									</span>
								</div>
								<div>
									<h4>Trip duration:</h4>
									<span>{currentTour.duration} weeks</span>
								</div>
								<div>
									<h4>Price:</h4>
									<span>${currentTour.price},-</span>
								</div>
							</div>
						</div>
						{stripeLoading ? (
							<div className="travel-detail-footer">
								<Spinner />
							</div>
						) : (
							<div className="travel-detail-footer">
								{error ? (
									<>
										<span>Couldn't fetch tour.. Try again later!</span>
										<Link style={{ color: "black" }} to="/">
											Go back home
										</Link>
									</>
								) : null}
								<button
									disabled={error ? true : false}
									onClick={handleClick}
									className="checkout-button"
								>
									Pay now
								</button>
								{/* <span className="cancel-button">Cancel</span> */}
							</div>
						)}
					</div>
				)
			) : null}
		</section>
	)
}

export default TravelDetailCheckout
