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
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state;
    }
}

export const loginThunkCreator = () => {
    return (dispatch) => {
        authAPI.login()
            .then(response => {
                if (response.resultCode === 0) {
                    const {id, email, login} = response.data;
                    dispatch(setUserData(id, email, login));
                }
            })
    }
}

export default authReducer;