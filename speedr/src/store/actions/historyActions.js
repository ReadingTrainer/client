import { axiosWithAuth } from '../axiosWithAuth';

const appURL = "http://localhost:5000";

export const FETCH_TEXTS_HISTORY = 'FETCH_TEXTS_HISTORY';

export const fetchWorkoutsHistory = () => dispatch => {
  const userId = localStorage.getItem("userId");

    // type LOADING needs to be added (also for the redux state) 
    axiosWithAuth().get(`${appURL}/texts/history/${userId}`)
      .then(res => {
  
        dispatch({ type: FETCH_TEXTS_HISTORY, session: res.data });
      })
      .catch(err => {
     // type ERROR needs to be added (also for the redux state)
      });
  };