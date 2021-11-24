import './Profile.module.css';
import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {setUserProfile} from "../../redux/actions/profile-actions";
import {connect} from "react-redux";
import {useParams} from 'react-router';

class ProfileObtained extends React.Component {
    componentDidMount() {
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

const ProfileContainer = (props) => {
    let {userId} = useParams();
    return (
        <ProfileObtained {...props} userId={userId}/>
    )
}

let mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile
    }
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);