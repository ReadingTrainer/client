/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

// core components
import Admin from "layouts/Admin.js";
import SignIn from "layouts/SignIn";
import SignUp from "layouts/SignUp.js";
import Components from "layouts/Landingpage/views/Components/Components";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Components} />        
        {/* <Redirect from="/" to="/sign_up" /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
