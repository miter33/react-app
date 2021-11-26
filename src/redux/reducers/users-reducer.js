import {
    SET_CURRENT_PAGE,
    FOLLOW,
    SET_USERS,
    UNFOLLOW,
    SET_TOTAL_USERS_COUNT,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    toggleIsFetching,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    toggleFollowingProgress, follow, unfollow
} from "../actions/users-actions";
import {usersAPI} from "../../api/api";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const getUserThunkCreator = (users, currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        if (users.length === 0) {
            usersAPI.getUsers(currentPage, pageSize)
                .then(data => {
                    dispatch(toggleIsFetching(false));
                    dispatch(setUsers(data.items));
                    dispatch(setTotalUsersCount(data.totalCount));
                })
        } else {
            dispatch(toggleIsFetching(false));
        }
    }
}

export const changeUserPageThunkCreator = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
            usersAPI.getUsers(pageNumber, pageSize)
                .then(data => {
                    dispatch(toggleIsFetching(false));
                    dispatch(setUsers(data.items));
                })
    }
}

export const followThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if(response.resultCode === 0) {
                    dispatch(follow(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            })
    }
}

export const unfollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if(response.resultCode === 0) {
                    dispatch(unfollow(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            })
    }
}

export default usersReducer;