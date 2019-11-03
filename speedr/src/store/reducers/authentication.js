import * as types from '../actions/authenticationActions';

const initialState = {
  user: {},
  userId: null,
  loadingUser: false,
  loginError: undefined,
  signUpError: undefined
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case (types.LOGIN):
      return { ...state, userId: action.payload, loginError: undefined, signUpError: undefined };
    case (types.LOGOUT):
      return {};
    case (types.LOADING_USER):
      return { ...state, loadingUser: action.payload };
    case (types.GET_USER):
      return { ...state, user: action.payload, error: '' };
    case (types.LOGIN_ERROR):
      return { ...state, loginError: action.payload };
    case (types.SIGNUP_ERROR):
      return { ...state, signUpError: action.payload };
    default:
      return state;
  }
}

export default userReducer;