import axios from "axios";
// import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const GET_TEXTS = "GET_TEXTS";
export const GET_TEXT = "GET_TEXT";
export const SHOW_NEXT_WORD = "SHOW_NEXT_WORD";
export const MAKE_PAUSE = "MAKE_PAUSE";
export const SHOW_TEXT_AFTER_PAUSE = "SHOW_TEXT_AFTER_PAUSE";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const getTexts = () => dispatch => {
  const userId = localStorage.getItem("userId");

  axios
    .get(`${appURL}/texts/${userId}`)
    .then(response => {
      dispatch(genericAction(GET_TEXTS, response.data));
    })
    .catch(error => {
      debugger;
    });
};

export const createText = (name, text) => dispatch => {
  let date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  date = `${months[mm - 1]} ${dd}, ${yyyy}`;

  const textBody = {
    user_id: localStorage.getItem("userId"),
    name,
    text,
    date
  };

  const userId = localStorage.getItem("userId");

  axios
    .post(`${appURL}/texts`, textBody)
    .then(response => {
      return axios.get(`${appURL}/texts/${userId}`).then(response => {
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
      dispatch(genericAction(GET_TEXT, response.data.text));
    })
    .catch(error => {
      debugger;
    });
};

export const deleteText = textId => dispatch => {
  const userId = localStorage.getItem("userId");

  axios
    .delete(`${appURL}/texts/text/${textId}`)
    .then(response => {
      return axios.get(`${appURL}/texts/${userId}`).then(response => {
        dispatch(genericAction(GET_TEXTS, response.data));
      });
    })
    .catch(error => {
      debugger;
    });
};

export const showNextWord = () => {
  return genericAction(SHOW_NEXT_WORD);
};
