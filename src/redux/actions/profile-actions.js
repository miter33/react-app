export const ADD_POST = 'ADD_POST';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const SET_USER_STATUS = 'SET-USER-STATUS';
export const DELETE_POST = 'DELETE-POST';

export const addPost = (newPostText) => ({
    type: ADD_POST,
    newPostText
});

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile: userProfile
})

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status: status
})
export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId: postId
})
