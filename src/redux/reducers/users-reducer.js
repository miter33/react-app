import {
    SET_CURRENT_PAGE,
    FOLLOW,
    SET_USERS,
    UNFOLLOW,
    SET_TOTAL_USERS_COUNT,
    TOGGLE_IS_FETCHING
} from "../actions/users-actions";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return  {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId) {
                        return { ...user, isFollow: true }
                    }
                    return user;
                })
            };
        }
        case UNFOLLOW: {
            return  {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId) {
                        return { ...user, isFollow: false }
                    }
                    return user;
                })
            };
        }
        case SET_USERS: {
            return  {
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
        default:
            return state;
    }
}

export default usersReducer;