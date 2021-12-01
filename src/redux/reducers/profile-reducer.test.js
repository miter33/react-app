import profileReducer from "./profile-reducer";
import {addPost, deletePost} from "../actions/profile-actions";

let state = {
    posts: [
        {id: 1, message: 'Hi how are you doing?', likesCount: 11},
        {id: 2, message: 'This is my first post', likesCount: 15}
    ]
};

test('new post should be added', () => {

    let action = addPost('some text')
    
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});

test('post should be deleted', () => {

    let action = deletePost(2)

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(1);
});