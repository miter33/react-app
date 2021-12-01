import {SET_USER_DATA, setUserData} from "../actions/auth-actions";
import {authAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      }
    }
    default:
      return state;
  }
}

export const getMeThunkCreator = () => {
  return async (dispatch) => {
    let response = await authAPI.me()

    if (response.resultCode === 0) {
      const {id, email, login} = response.data;
      dispatch(setUserData(id, email, login, true));
    }
  }
}

export const loginThunkCreator = (email, password, rememberMe) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.resultCode === 0) {
      dispatch(getMeThunkCreator());
    } else {
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
      dispatch(stopSubmit('login', {_error: message}));
    }
  }
}

export const logoutThunkCreator = () => {
  return async (dispatch) => {
    let response = await authAPI.logout();
    
    if (response.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  }
}

export default authReducer;