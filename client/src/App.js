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

const App = (props) => {
	useEffect(() => {
		props.tryAutoSignUp()
	}, [])

	let routes = (
		<>
			<Route path="/Login" component={Login} />
			<Route path="/tour/:id" exact component={TravelDetail} />
			<Route path="/" exact component={Home} />
			<Route to="*" component={ErrorPage} />
		</>
	)

	if (props.isAuthenticated) {
		routes = (
			<>
				<Route path="/Login" exact component={Login} />
				<Route path="/tour/:id" exact component={TravelDetail} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/settings" exact component={Settings} />
				<Route path="/logout" exact component={Logout} />
				<Route path="/" exact component={Home} />
				<Route to="*" component={ErrorPage} />
			</>
		)
	}

	return (
		<>
			<Navbar name={props.name} isAuthenticated={props.isAuthenticated} />
			<Switch>{routes}</Switch>
			<Footer />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		name: state.auth.name,
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		tryAutoSignUp: () => dispatch(actions.checkAuth()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
