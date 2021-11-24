import {connect} from "react-redux";
import {
    setCurrentPage,
    follow,
    setUsers,
    unfollow, setTotalUsersCount, toggleIsFetching
} from "../../redux/actions/users-actions";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        if (this.props.users.length === 0) {
            axios.get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
                    withCredentials: true
                })
                .then(response => {
                    debugger
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
        } else {
            this.props.toggleIsFetching(false);
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber)
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
                withCredentials: true
            })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
            })
    }
    
    follow = (userId) => {
        axios.post(
            `https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},{
                withCredentials: true,
                headers: {
                    'API-KEY': 'a9363b3d-a74f-4ccd-850c-cb1fc1eaeec4'
                }
            })
            .then(response => {
                debugger
                if(response.data.resultCode === 0) {
                    this.props.follow(userId);
                }
            })
    }

    unfollow = (userId) => {
        axios.delete(
            `https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
                withCredentials: true,
                headers: {
                    'API-KEY': 'a9363b3d-a74f-4ccd-850c-cb1fc1eaeec4'
                }
            })
            .then(response => {
                debugger
                if(response.data.resultCode === 0) {
                    this.props.unfollow(userId);
                }
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    unfollow={this.unfollow}
                    follow={this.follow}
                    onPageChanged={this.onPageChanged}
                    toggleIsFetching={this.props.toggleIsFetching}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer); 