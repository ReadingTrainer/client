import * as types from "../actions/textsActions";

const initialState = {
  texts: null,
  text: null
};

function textsReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TEXTS:
      return {
        ...state,
        texts: action.payload
      };

    case types.GET_TEXT:
      return {
        ...state,
        text: action.payload.text
      };
    default:
      return state;
  }
}

export default textsReducer;
