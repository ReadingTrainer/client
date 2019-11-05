import { axiosWithAuth } from "../axiosWithAuth";

const appURL = "http://localhost:5000";

export const FETCH_TEXTS_HISTORY = "FETCH_TEXTS_HISTORY";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const fetchTextsHistory = () => dispatch => {
  const userId = localStorage.getItem("userId");

  // type LOADING needs to be added (also for the redux state)
  axiosWithAuth()
    .get(`${appURL}/texts/history/${userId}`)
    .then(res => {
      debugger
      dispatch(genericAction(FETCH_TEXTS_HISTORY, res.data.textHistory));
    })
    .catch(err => {
      // type ERROR needs to be added (also for the redux state)
    });
};
