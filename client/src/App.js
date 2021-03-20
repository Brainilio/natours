import React, { useEffect } from "react"
import { Route, Switch, Redirect } from "react-router"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navigation/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import ErrorPage from "./pages/Error/Error"
import TravelDetail from "./pages/TravelDetail/Traveldetail"
import Dashboard from "./pages/Dashboard/Dashboard"
import Settings from "./pages/Settings/Settings"
import Logout from "./pages/Login/Logout"
import * as actions from "./store/actions/index"
import { connect } from "react-redux"
import Users from "./components/Admin/Users/Users"
import Tours from "./components/Admin/Tours/Tours"
import MyReviews from "./pages/MyReviews/MyReviews"
import Statistics from "./pages/Statistics/Statistics"
import BookedTours from "./pages/BookedTours/BookedTours"

const App = (props) => {
	useEffect(() => {
		props.tryAutoSignUp()
	}, [])

	let routes = (
		<>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/Login" component={Login} />
				<Route path="/tour/:id" component={TravelDetail} />
				<Route path="/bookedtours" component={BookedTours} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</>
	)

	if (props.isAuthenticated) {
		routes = (
			<>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/Login" component={Login} />
					<Route path="/tour/:id" component={TravelDetail} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/settings" component={Settings} />
					<Route path="/myreviews" component={MyReviews} />
					<Route path="/bookedtours" component={BookedTours} />
					<Route path="/logout" component={Logout} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</>
		)
	}

	if (props.isAuthenticated && props.role === "admin") {
		routes = (
			<>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/Login" component={Login} />
					<Route path="/tour/:id" component={TravelDetail} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/users" component={Users} />
					<Route path="/tours" component={Tours} />
					<Route path="/settings" component={Settings} />
					<Route path="/myreviews" component={MyReviews} />
					<Route path="/bookedtours" component={BookedTours} />
					<Route path="/statistics" component={Statistics} />
					<Route path="/logout" component={Logout} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</>
		)
	}

	return (
		<>
			<Navbar name={props.name} isAuthenticated={props.isAuthenticated} />
			{routes}
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		name: state.auth.name,
		role: state.auth.role,
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		tryAutoSignUp: () => dispatch(actions.checkAuth()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
