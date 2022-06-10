import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "./Contexts/CurrencyContext";

import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Page403 from "../src/components/errors/Page403";
import Page404 from "../src/components/errors/Page404";
import PublicRoute from "./publicRoute";
import { GlobalProvider } from "./Contexts/GlobalContext";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              {/*<Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
  <Route exact path="/contact" component={Contact}/>*/}
              <AdminPrivateRoute path="/admin" name="Admin" />
              <PublicRoute path="/" name="Home" />
              <Route path="/403" component={Page403} />
              <Route path="/404" component={Page404} />
              <Route path="/login">
                {localStorage.getItem("auth_token") ? (
                  <Redirect to="/" />
                ) : (
                  <Login />
                )}
              </Route>
              <Route path="/register">
                {localStorage.getItem("auth_token") ? (
                  <Redirect to="/" />
                ) : (
                  <Register />
                )}
              </Route>
              {/* <Route  path="/register" component={Register}/>
          <Route  path="/login" component={Login}/>*/}
              {/*<Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>}/>*/}
            </Switch>
          </Router>
        </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
