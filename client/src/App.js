import React from "react"
import { Route, Switch } from "react-router"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navigation/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import ErrorPage from "./pages/Error/Error"
import TravelDetail from "./pages/TravelDetail/Traveldetail"
import Dashboard from "./pages/Dashboard/Dashboard"
import Settings from "./pages/Settings/Settings"

const App = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path="/Login" component={Login} />
				<Route path="/tour/:id" exact component={TravelDetail} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/settings" exact component={Settings} />
				<Route path="/" exact component={Home} />
				<Route render={ErrorPage} />
			</Switch>
			<Footer />
		</>
	)
}

export default App
