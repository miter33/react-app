import React from "react";
import {addPost, updateNewPostText} from "../../../redux/actions/profile-actions";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MyPostsContainer = connect(mapStateToProps, 
    { updateNewPostText, addPost })(MyPosts);

export default MyPostsContainer;