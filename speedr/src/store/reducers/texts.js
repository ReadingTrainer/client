import * as types from "../actions/textsActions";

const initialState = {
  texts: null
};

function textsReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TEXTS:
      return {
        ...state,
        texts: action.payload
      };
    default:
      return state;
  }
}

export default textsReducer;
