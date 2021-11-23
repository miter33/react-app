import './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";

const MyPosts = (props) => {
    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }
    
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }
    return (
        <div>
            My posts
            <div>
                <textarea
                    onChange={onPostChange}
                    ref={newPostElement}
                    value={props.newPostText}
                />
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            {
                props.posts.map(p => <Post key={p.id} message={p.message}/>)
            }
        </div>
    )
};

export default MyPosts;