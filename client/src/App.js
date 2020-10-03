import React from "react"
import { Route, Switch } from "react-router"
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
		</>
	)
}

export default App
