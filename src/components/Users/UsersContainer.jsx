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
    getPageSizeSelector, getTotalUsersCountSelector, getUsersFilter,
    getUsersSelector
} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUserThunkCreator(this.props.currentPage, this.props.pageSize, '');
    }
    
    onPageChanged = (pageNumber) => {
        this.props.getUserThunkCreator(pageNumber, this.props.pageSize, this.props.filter.term, this.props.filter.friend);
    }
    
    follow = (userId) => {
        this.props.followThunkCreator(userId);
    }
    
    unfollow = (userId) => {
        this.props.unfollowThunkCreator(userId);
    }
    
    onFilterChanged = (filter) => {
        const {pageSize} = this.props;
        this.props.getUserThunkCreator(1, pageSize, filter.term, filter.friend);
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
                    onFilterChanged={this.onFilterChanged}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        filter: getUsersFilter(state)
    }
}

export default compose(connect(mapStateToProps, {
    getUserThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
}))(UsersContainer);