import React from "react";
import {addPost} from "../../../redux/actions/profile-actions";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect(mapStateToProps, 
    { addPost })(MyPosts);

export default MyPostsContainer;