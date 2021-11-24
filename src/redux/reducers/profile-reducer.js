﻿import {ADD_POST, SET_USER_PROFILE, UPDATE_NEW_POST_TEXT} from "../actions/profile-actions";

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you doing?', likesCount: 11},
        {id: 2, message: 'This is my first post', likesCount: 15}
    ],
    userProfile: null,
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
        default:
            return state;
    }
}

export default profileReducer;