import {
    FOLLOW,
    follow,
    SET_CURRENT_PAGE, SET_FILTER,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    setCurrentPage, setFilter,
    setTotalUsersCount,
    setUsers,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    toggleFollowingProgress,
    toggleIsFetching,
    UNFOLLOW,
    unfollow
} from "../actions/users-actions";
import {usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/object-helpers";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                //   users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //       return {...user, followed: false}
                //     }
                //     return user;
                //   })
                // };
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
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
        case SET_FILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }
        default:
            return state;
    }
}

export const getUserThunkCreator = (currentPage, pageSize, filter) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleIsFetching(false));
    dispatch(setCurrentPage(currentPage));
    dispatch(setFilter(filter));
    let data = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const followThunkCreator = (userId) => async (dispatch) => {
    let actionCreator = follow;

    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actionCreator)
}

export const unfollowThunkCreator = (userId) => async (dispatch) => {
    let actionCreator = unfollow;
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actionCreator)
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export default usersReducer;