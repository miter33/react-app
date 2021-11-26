import './Profile.module.css';
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {useParams} from 'react-router';
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";

class ProfileObtained extends React.Component {
    componentDidMount() {
        this.props.getUserProfileThunkCreator(this.props.userId);
        this.props.getUserStatusThunkCreator(this.props.userId);
    }

    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

const ProfileContainer = (props) => {
    const {userId} = useParams();
    return (
        <ProfileObtained {...props} userId={userId} />
    )
}

let mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        isAuth: state.auth.isAuth,
        personalId: state.auth.userId,
        status: state.profilePage.status
    }
}
export default compose(
    connect(mapStateToProps, {
        getUserProfileThunkCreator,
        getUserStatusThunkCreator,
        updateUserStatusThunkCreator})
)(ProfileContainer);
