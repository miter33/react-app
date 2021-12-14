import usersReducer from "./users-reducer";
import {follow, unfollow} from "../actions/users-actions";

let state;

beforeEach(() => {
  state = {
    users: [
      {
        id: 1, name: 'Alex1', followed: false,
        photos: { small: null, large: null }, status: 'status 1'
      },
      {
        id: 2, name: 'Alex2', followed: false,
        photos: { small: null, large: null }, status: 'status 2'
      },
      {
        id: 3, name: 'Alex3', followed: true,
        photos: { small: null, large: null }, status: 'status 3'
      },
      {
        id: 4, name: 'Alex4', followed: true,
        photos: { small: null, large: null }, status: 'status 4'
      }
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
})

test('follow success', () => {
  
  const newState = usersReducer(state, follow(1));
  
  expect(newState.users[0].followed).toBeTruthy();
  expect(newState.users[1].followed).toBeFalsy();
})

test('unfollow success', () => {

  const newState = usersReducer(state, unfollow(3));

  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
})