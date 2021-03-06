import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    changeUserPageThunkCreator,
    followThunkCreator,
    getUserThunkCreator,
    unfollowThunkCreator
} from "../../redux/reducers/users-reducer";
import {compose} from "redux";
import {
    getCurrentPageSelector,
    getFollowingInProgressSelector,
    getIsFetchingSelector,
    getPageSizeSelector, getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUserThunkCreator(this.props.users, this.props.currentPage, this.props.pageSize);
    }
    
    onPageChanged = (pageNumber) => {
        this.props.changeUserPageThunkCreator(pageNumber, this.props.pageSize);
    }
    
    follow = (userId) => {
        this.props.followThunkCreator(userId);
    }
    
    unfollow = (userId) => {
        this.props.unfollowThunkCreator(userId);
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
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}

export default compose(connect(mapStateToProps, {
    getUserThunkCreator,
    changeUserPageThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
}))(UsersContainer);