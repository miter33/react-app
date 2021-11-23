import {
    SET_CURRENT_PAGE,
    FOLLOW,
    SET_USERS,
    UNFOLLOW,
    SET_TOTAL_USERS_COUNT,
    TOGGLE_IS_FETCHING
} from "../actions/users-actions";

let initialState = {
    users: [
        // {
        //     id: 1,
        //     fullName: 'Victor',
        //     photoUrl: 'https://avatars.mds.yandex.net/i?id=3044abaf6261d938d075bb96118efe9f-5524072-images-thumbs&n=13&exp=1',
        //     isFollow: true,
        //     status: 'I`m looking for a job',
        //     location: {
        //         country: 'Belarus',
        //         city: 'Minsk'
        //     }
        // },
        // {
        //     id: 2,
        //     fullName: 'Boris',
        //     photoUrl: 'https://img2.goodfon.com/original/1600x1200/2/e0/kris-payn-akter-foto.jpg',
        //     isFollow: false,
        //     status: 'I`m in a charge here',
        //     location: {
        //         country: 'Russia',
        //         city: 'Moscow'
        //     }
        // },
        // {
        //     id: 3,
        //     fullName: 'Michael',
        //     photoUrl: 'https://i.pinimg.com/originals/0f/a2/eb/0fa2ebc49aa4c9f8590e6e259a26f956.jpg',
        //     isFollow: true,
        //     status: 'I`m hiring developers',
        //     location: {
        //         country: 'Ukraine',
        //         city: 'Kiev'
        //     }
        // }
    ],
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