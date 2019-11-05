import * as type from "../actions/historyActions";


const initialState = {
  history: null
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TEXTS_HISTORY:

          return {
        ...state,
        history: action.payload
      };

    default:
      return state;
  }
};

export default history;
