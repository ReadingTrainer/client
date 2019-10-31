import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";
import App from "./App";
import "./index.css";



const store = createStore(rootReducer, applyMiddleware(logger, thunk));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);