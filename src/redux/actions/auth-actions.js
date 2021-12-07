export const SET_USER_DATA = 'SET--USER-DATA';

export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: { userId, email, login, isAuth }
});