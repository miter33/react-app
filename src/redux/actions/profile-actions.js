export const ADD_POST = 'ADD_POST';
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const SET_USER_STATUS = 'SET-USER-STATUS';

export const addPost = () => ({
    type: ADD_POST
});

export const updateNewPostText = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile: userProfile
})

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status: status
})