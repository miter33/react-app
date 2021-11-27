import {SET_USER_DATA, setUserData} from "../actions/auth-actions";
import {authAPI, profileAPI} from "../../api/api";
import {setUserProfile} from "../actions/profile-actions";

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
    return (dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.resultCode === 0) {
                    const {id, email, login} = response.data;
                    dispatch(setUserData(id, email, login, true));
                }
            })
    }
}

export const loginThunkCreator = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                debugger
                if (response.resultCode === 0) {
                    dispatch(getMeThunkCreator());
                }
            })
    }
}

export const logoutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false));
                }
            })
    }
}

export default authReducer;