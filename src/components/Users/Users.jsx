import React from 'react'
import personPhoto from "../../assets/images/person.jpg";
import style from "./Users.module.css";
import axios from "axios";

class Users extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0)
            axios.get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
    }
    
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                debugger
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <div>
                <div>
                    {
                        pages.map(p => {
                            return (<button onClick={ () => this.onPageChanged(p) } className={p === this.props.currentPage && style.selectedPage}>{p} </button>)
                        })
                    }
                </div>
                {
                    this.props.users.map((user) =>
                        <div key={user.id}>
                            <span>
                                <div>
                                    <img src={user.photos.small ?? personPhoto}
                                         className={style.userPhoto}/>
                                </div>
                                <div>
                                    {
                                        user.isFollow ?
                                            <button onClick={() => this.props.unfollow(user.id)}>Unfollow</button> :
                                            <button onClick={() => this.props.follow(user.id)}>Follow</button>
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
}

export default Users;