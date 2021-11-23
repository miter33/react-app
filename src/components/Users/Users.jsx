﻿import React from 'react'
import personPhoto from "../../assets/images/person.jpg";
import style from "./Users.module.css";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    
    return (
        <div>
            <div>
                {
                    pages.map(p => {
                        return (<button
                            onClick={() => props.onPageChanged(p)}
                            className={p === props.currentPage && style.selectedPage}
                        >
                            {p}
                        </button>)
                    })
                }
            </div>
            {
                props.users.map((user) =>
                    <div key={user.id}>
                            <span>
                                <div>
                                    <img src={user.photos.small ?? personPhoto}
                                         className={style.userPhoto}/>
                                </div>
                                <div>
                                    {
                                        user.isFollow ?
                                            <button onClick={() => props.unfollow(user.id)}>Unfollow</button> :
                                            <button onClick={() => props.follow(user.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                        <span>
                                <span>
                                    <div>
                                        {user.name}
                                    </div>
                                    <div>
                                        {user.status}
                                    </div>
                                </span>
                                <span>
                                    <div>
                                        {'user.location.country'}
                                    </div>
                                    <div>
                                        {'user.location.city'}
                                    </div>
                                </span>
                            </span>
                    </div>
                )
            }
        </div>
    )
}

export default Users;