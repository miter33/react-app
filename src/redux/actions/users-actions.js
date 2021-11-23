export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';

export const followActionCreator = (userId) => ({
    type: FOLLOW,
    userId: userId
});

export const unfollowActionCreator = (userId) => ({
    type: UNFOLLOW,
    userId: userId
})

export const setUsersActionCreator = (users) => ({
    type: SET_USERS,
    users: users
})