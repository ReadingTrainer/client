/* eslint-disable no-duplicate-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import * as types from "../actions/textsActions";

const initialState = {
  texts: null,
  text: null,
  currentWord: null,
  currentIndexOfWord: 0
};

function textsReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TEXTS:
      return {
        ...state,
        texts: action.payload
      };

    case types.GET_TEXT:
      const splittedText = action.payload.text.split(" ");

      return {
        ...state,
        text: splittedText,
        currentWord: splittedText[0],
        currentIndexOfWord: 0
      };

    case types.SHOW_NEXT_WORD:
      const nextWord = state.text[state.currentIndexOfWord + 1];
      const currentIndexOfWord = state.currentIndexOfWord + 1;

      return {
        ...state,
        currentWord: nextWord,
        currentIndexOfWord: currentIndexOfWord
      };

    default:
      return state;
  }
}

export default textsReducer;
