import {
  ADD_POST,
  DELETE_POST, SAVE_PHOTO_SUCCESS, savePhotoSuccess, saveProfileSuccess,
  SET_USER_PROFILE,
  SET_USER_STATUS,
  setUserProfile,
  setUserStatus
} from "../actions/profile-actions";
import {profileAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

let initialState = {
  posts: [
    {id: 1, message: 'Hi how are you doing?', likesCount: 11},
    {id: 2, message: 'This is my first post', likesCount: 15}
  ],
  userProfile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.userProfile
      }
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.photos }
      }
    }
    default:
      return state;
  }
}

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
  let response = await profileAPI.getUserProfile(userId)
  dispatch(setUserProfile(response));
}


export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userId)
  dispatch(setUserStatus(response.data));
}


export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
  let response = await profileAPI.updateUserStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
}

export const savePhoto = (image) => async (dispatch) => {
  let response = await profileAPI.savePhoto(image);
  if(response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  let response = await profileAPI.saveProfile(profile);
  console.log(response.data)
  if(response.data.resultCode === 0) {
    dispatch(getUserProfileThunkCreator(getState().auth.userId));
  } else {
    dispatch(stopSubmit('profileData', {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0]);
  }
}

export default profileReducer;