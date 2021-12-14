import React from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />
            <Paginator
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />
            {
                props.users.map((user) =>
                    <User
                        user={user}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        key={user.id}
                    />
                )
            }
        </div>
    )
}



export default Users;