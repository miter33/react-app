import {
    ADD_POST,
    SET_USER_PROFILE, SET_USER_STATUS,
    setUserProfile,
    setUserStatus
} from "../actions/profile-actions";
import {profileAPI} from "../../api/api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you doing?', likesCount: 11},
        {id: 2, message: 'This is my first post', likesCount: 15}
    ],
    userProfile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
    }
}

export const getUserStatusThunkCreator = (userId) => {
    return (dispatch) => {
        // profileAPI.updateUserStatus('Hello').then();
        profileAPI.getUserStatus(userId)
            .then(status => {
                dispatch(setUserStatus(status.data));
            })
    }
}

export const updateUserStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            })
    }
}

export default profileReducer;