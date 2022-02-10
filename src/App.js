import React from "react"
import Signup from "./auth_components/Signup"
import { AuthProvider } from "./auth_components/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import Login from "./auth_components/Login"
import PrivateRoute from "./auth_components/PrivateRoute"
import ForgotPassword from "./auth_components/ForgotPassword"
import UpdateProfile from "./auth_components/UpdateProfile"

function App() {
  return (
    
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      
  )
}

export default App
