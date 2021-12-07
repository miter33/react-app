export const SET_USER_DATA = 'SET--USER-DATA';
export const SET_CAPTCHA_URL = 'SET-CAPTCHA-URL';

export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: { userId, email, login, isAuth }
});

export const setCaptchaUrl = (url) => ({
    type: SET_CAPTCHA_URL,
    url: url
});