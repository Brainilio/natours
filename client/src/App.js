import React from "react"
import { Route, Switch } from "react-router"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navigation/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import TravelDetail from "./pages/TravelDetail/Traveldetail"

const App = () => {
	return (
		<>
			<Navbar />

			<Switch>
				<Route path="/Login" component={Login} />
				<Route path="/tour/:id" exact component={TravelDetail} />
				<Route path="/" exact component={Home} />
			</Switch>

			<Footer />
		</>
	)
}

export default App
