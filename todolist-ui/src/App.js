import React, { Component } from 'react';
import './App.css';
import Login from "./main/Login"
import Main from "./main/Main"
import { withCookies } from "react-cookie";
import { Router, Route, browserHistory } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    browserHistory.push("/login")
    return (
        <Router history={browserHistory}>
            <Route path={"/"} component={App} />
            <Route path={"login"} component={Login} />
            <Route path={"main"} component={Main} />
        </Router>
    );
  }
}

export default withCookies(App);

