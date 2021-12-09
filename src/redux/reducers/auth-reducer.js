import {SET_CAPTCHA_URL, SET_USER_DATA, setCaptchaUrl, setUserData} from "../actions/auth-actions";
import {authAPI, securityAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: true,
  captchaUrl: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      }
    }
    case SET_CAPTCHA_URL: {
      return {
        ...state,
        captchaUrl: action.url
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

export const loginThunkCreator = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.resultCode === 0) {
      dispatch(getMeThunkCreator());
    } else {
      if(response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
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

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(setCaptchaUrl(captchaUrl));
  }
}

export default authReducer;