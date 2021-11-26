import {
    ADD_POST,
    SET_USER_PROFILE, SET_USER_STATUS,
    setUserProfile,
    setUserStatus,
    UPDATE_NEW_POST_TEXT
} from "../actions/profile-actions";
import {setCurrentPage, setUsers, toggleIsFetching} from "../actions/users-actions";
import {profileAPI, usersAPI} from "../../api/api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you doing?', likesCount: 11},
        {id: 2, message: 'This is my first post', likesCount: 15}
    ],
    userProfile: null,
    status: '',
    newPostText: 'it-kamasutra.com'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
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
        profileAPI.getUserStatus(userId)
            .then(status => {
                debugger
                dispatch(setUserStatus(status.data));
            })
    }
}

export const updateUserStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                debugger
                if(response.data.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            })
    }
}

export default profileReducer;