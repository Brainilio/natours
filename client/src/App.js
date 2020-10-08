import React from "react"
import { Route, Switch } from "react-router"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navigation/Navbar/Navbar"
import Sidedrawer from "./components/Navigation/Sidedrawer/Sidedrawer"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"

const App = () => {
	return (
		<>
			{/* <Navbar /> */}
			<Switch>
				<Route path="/Login" component={Login} />
				<Route path="/" exact component={Home} />
			</Switch>
			<Footer />
		</>
	)
}

export default App
