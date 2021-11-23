export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';

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

export const setCurrentPageActionCreator = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
})

export const setTotalUsersCountActionCreator = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount
})