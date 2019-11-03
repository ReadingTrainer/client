import axios from "axios";
// import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const GET_TEXTS = "GET_TEXTS";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const getTexts = () => dispatch => {
  const user = { userId: localStorage.getItem("userId") };
  axios
    .get(`${appURL}/texts`, user)
    .then(response => {
      debugger;
      // dispatch(genericAction(LOGIN, userId));
    })
    .catch(error => {
      debugger;
    });
};

export const createText = (name, text) => dispatch => {
  const textBody = { name, text };

  axios
    .post(`${appURL}/texts`, textBody)
    .then(response => {
      debugger;
      // dispatch(genericAction(LOGIN, userId));
    })
    .catch(error => {
      debugger;
    });
};

export const getOneText = textId => dispatch => {
  axios
    .get(`${appURL}/texts/${textId}`)
    .then(response => {
      debugger;
      // dispatch(genericAction(LOGIN, userId));
    })
    .catch(error => {
      debugger;
    });
};
