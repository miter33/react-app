import './Profile.module.css';
import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {Navigate, useHistory, useParams} from 'react-router';
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator, savePhoto, saveProfile,
    updateUserStatusThunkCreator
} from "../../redux/reducers/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileObtained extends React.Component {
    // componentDidMount() {
        // this.props.getUserProfileThunkCreator(this.props.userId);
        // this.props.getUserStatusThunkCreator(this.props.userId);
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.userId !== this.props.userId) {
    //         this.props.getUserProfileThunkCreator(this.props.userId);
    //         this.props.getUserStatusThunkCreator(this.props.userId);
    //     }
    // }

    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

const ProfileContainer = (props) => {
    const dispatch = useDispatch();
    
    const userProfile = useSelector(state => state.profilePage.userProfile);
    const isAuth = useSelector(state => state.auth.isAuth);
    const personalId = useSelector(state => state.auth.userId);
    const status = useSelector(state => state.profilePage.status);
    
    let {userId} = useParams();
    userId = userId ?? personalId;
    
    useEffect(() => {
        dispatch(getUserProfileThunkCreator(userId));
        dispatch(getUserStatusThunkCreator(userId));
    }, []);

    useEffect(() => {
        dispatch(getUserProfileThunkCreator(userId));
        dispatch(getUserStatusThunkCreator(userId));
    }, [userId]);
    
    // return (
    //     <ProfileObtained {...props} userId={userId}/>
    // )

    return (
        <Profile
            userProfile={userProfile}
            isAuth={isAuth}
            personalId={personalId}
            status={status}
            {...props}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        // userProfile: state.profilePage.userProfile,
        // isAuth: state.auth.isAuth,
        // personalId: state.auth.userId,
        // status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, {
        // getUserProfileThunkCreator,
        // getUserStatusThunkCreator,
        updateUserStatusThunkCreator,
        savePhoto,
        saveProfile
    }), withAuthRedirect
)(ProfileContainer);
