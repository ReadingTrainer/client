import axios from "axios";
// import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const GET_TEXTS = "GET_TEXTS";
export const GET_TEXT = "GET_TEXT";

export const genericAction = (type, payload) => ({
  type,
  payload
});

const userId = localStorage.getItem("userId");

export const getTexts = () => dispatch => {
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

      return axios.get(`${appURL}/texts/${userId}`).then(response => {
        debugger;
        dispatch(genericAction(GET_TEXTS, response.data));
      });
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
      dispatch(genericAction(GET_TEXT, response.data));
    })
    .catch(error => {
      debugger;
    });
};

export const deleteText = textId => dispatch => {
  axios
    .delete(`${appURL}/texts/text/${textId}`)
    .then(response => {
      debugger;

      return axios.get(`${appURL}/texts/${userId}`).then(response => {
        debugger;
        dispatch(genericAction(GET_TEXTS, response.data));
      });
    })
    .catch(error => {
      debugger;
    });
};
