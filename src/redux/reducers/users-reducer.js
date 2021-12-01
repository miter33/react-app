import {
  FOLLOW,
  follow,
  SET_CURRENT_PAGE,
  SET_TOTAL_USERS_COUNT,
  SET_USERS,
  setCurrentPage,
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
  followingInProgress: []
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
    default:
      return state;
  }
}

export const getUserThunkCreator = (users, currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  if (users.length === 0) {
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  } else {
    dispatch(toggleIsFetching(false));
  }
}

export const changeUserPageThunkCreator = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(pageNumber));
  let data = await usersAPI.getUsers(pageNumber, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
}

export const followThunkCreator = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.follow.bind(usersAPI);
  let actionCreator = follow;

  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollowThunkCreator = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.unfollow.bind(usersAPI);
  let actionCreator = unfollow;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
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