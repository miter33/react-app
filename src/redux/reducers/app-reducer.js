import {initializedSuccess, SET_INITIALIZED_SUCCESS} from "../actions/app-actions";
import {getMeThunkCreator} from "./auth-reducer";

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export const initializeApp = () => {
    return (dispatch) => {
        let promiseResult = dispatch(getMeThunkCreator())
        promiseResult.then(() => {
            dispatch(initializedSuccess())
        })
    }
}

export default appReducer;