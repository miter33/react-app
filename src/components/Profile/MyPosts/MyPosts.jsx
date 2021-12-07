import './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {
    let addPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div>
            My posts
            <AddNewPostReduxForm onSubmit={addPost}/>
            {
                props.posts.map(p => <Post key={p.id} message={p.message}/>)
            }
        </div>
    )
};

const AddNewPostForm  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name='newPostText'
                    placeholder={'placeholder'}
                    validate={[requiredField, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>

    )
}

const AddNewPostReduxForm = reduxForm({
    form: 'profileAddNewPostForm'
})(AddNewPostForm);

export default MyPosts;