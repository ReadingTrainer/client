import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOADING_USER = "LOADING_USER";
export const GET_USER = "GET_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const USER_ERROR = "USER_ERROR";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const doSignIn = (user, history) => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axios
    .post(`${appURL}/auth/login`, user)
    .then(response => {
      debugger
      const { token, userId, username } = response.data;
      dispatch(genericAction(LOGIN, user));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      history.push("/admin");
    })
    .catch(error => {
      debugger
      let { errorMessage } = error.response.data;
      dispatch(genericAction(LOGIN_ERROR, errorMessage));
    })
    .finally(() => dispatch(genericAction(LOADING_USER, false)));
};

export const doSignUp = (user, history) => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axios
    .post(`${appURL}/auth/signup`, user)
    .then(response => {
      debugger
      const { token, user, username } = response.data;
      dispatch(genericAction(LOGIN, user));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user);
      localStorage.setItem("username", username);
      history.push("/admin");
    })
    .catch(error => {
      debugger
      let { errorMessage } = error.response.data;
      dispatch(genericAction(SIGNUP_ERROR, errorMessage));
    })
    .finally(() => dispatch(genericAction(LOADING_USER, false)));
};

export const doLogOut = () => dispach => {
  localStorage.removeItem("token");
  dispach(genericAction(LOGOUT));
};

export const doGetUser = () => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axiosWithAuth()
    .get(`${appURL}/profile`)
    .then(response => {
      dispatch(genericAction(GET_USER, response.data));
    })
    .catch(error =>
      dispatch(genericAction(USER_ERROR, error.response.data.errorMessage))
    )
    .finally(() => dispatch(genericAction(LOADING_USER, false)));
};
