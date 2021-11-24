import './Profile.module.css';
import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {setUserProfile} from "../../redux/actions/profile-actions";
import {connect} from "react-redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/profile/${2}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        debugger
        return (
            <Profile {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile
    }
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);