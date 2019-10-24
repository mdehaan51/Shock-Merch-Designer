import React, { Component } from "react";
import "./styles/App.css";
import "./styles/Auth.css";
import "./styles/Admin.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//import DesignLayout from "./components/DesignLayout.js";
import DrawingDashboard from "./components/DrawingComponents/DrawingDashboard";
import RequestQuote from "./components/DrawingComponents/RequestQuote";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Admin from "./components/admin/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import PasswordReset from "./components/auth/PasswordReset";

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/reset/:token" component={PasswordReset} />

            <Switch>
              <AdminRoute
                exact
                path="/admin-dashboard"
                component={AdminDashboard}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                component={DrawingDashboard}
              />
              <PrivateRoute
                exact
                path="/request-quote"
                component={RequestQuote}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
