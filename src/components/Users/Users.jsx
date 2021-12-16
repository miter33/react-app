import React, {useEffect} from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {
    getCurrentPageSelector,
    getFollowingInProgressSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersFilter,
    getUsersSelector
} from "../../redux/selectors/users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {followThunkCreator, getUserThunkCreator, unfollowThunkCreator} from "../../redux/reducers/users-reducer";
import {useLocation, useNavigate} from "react-router";
import * as queryString from "querystring"
import {createBrowserHistory} from 'history';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const users = useSelector(getUsersSelector);
    const pageSize = useSelector(getPageSizeSelector);
    const totalUsersCount = useSelector(getTotalUsersCountSelector);
    const currentPage = useSelector(getCurrentPageSelector);
    const followingInProgress = useSelector(getFollowingInProgressSelector);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const query = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);
        const queryParams = queryString.stringify(query);
        
        createBrowserHistory().push(`/users?${queryParams}`);
    }, [filter, currentPage]);

    useEffect(() => {
        let actualPage = currentPage;
        let actualFilter = filter;
        const parsed = queryString.parse(location.search.substr(1));
        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term};

        switch (parsed.friend) {
            case 'false':
                parsed.friend = false
                break;
            case 'true':
                parsed.friend = true;
                break;
            default:
                parsed.friend = null
                break;
        }

        actualFilter = {...actualFilter, friend: parsed.friend};

        dispatch(getUserThunkCreator(actualPage, pageSize, actualFilter));
    }, []);

    const onPageChanged = (pageNumber) => {
        dispatch(getUserThunkCreator(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter) => {
        dispatch(getUserThunkCreator(1, pageSize, filter));
    }

    const follow = (userId) => {
        dispatch(followThunkCreator(userId));
    }

    const unfollow = (userId) => {
        dispatch(unfollowThunkCreator(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            {
                users.map((user) =>
                    <User
                        user={user}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unfollow={unfollow}
                        key={user.id}
                    />
                )
            }
        </div>
    )
}


export default Users;