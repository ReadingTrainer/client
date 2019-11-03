import axios from "axios";
// import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const GET_TEXTS = "GET_TEXTS";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const getTexts = () => dispatch => {
  const userId = localStorage.getItem("userId");

  axios
    .get(`${appURL}/texts/${userId}`)
    .then(response => {
      debugger;
      dispatch(genericAction(GET_TEXTS, response.data));
    })
    .catch(error => {
      debugger;
    });
};

export const createText = (name, text) => dispatch => {
  const textBody = {
    user_id: localStorage.getItem("userId"),
    name,
    text
  };

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
    .get(`${appURL}/texts/text/${textId}`)
    .then(response => {
      debugger;
      // dispatch(genericAction(LOGIN, userId));
    })
    .catch(error => {
      debugger;
    });
};
