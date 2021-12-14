﻿import {createSelector} from "reselect";

export const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(() => true);
})

export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize;
}

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage;
}

export const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state) => {
    return state.usersPage.filter;
}