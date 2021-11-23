// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";
//
// let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hi how are you doing?', likesCount: 11},
//                 {id: 2, message: 'This is my first post', likesCount: 15}
//             ],
//             newPostText: 'it-kamasutra.com'
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Aliaksei'},
//                 {id: 2, name: 'Victor'},
//                 {id: 3, name: 'Carlos'}
//             ],
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How are you?'},
//                 {id: 3, message: 'What`s up?'}
//             ],
//             newMessageBody: ''
//         },
//         sidebar:{}
//     },
//     _callSubscriber() {
//         console.log('state was changed')
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action);
//         this._callSubscriber();
//         // if (action.type === ADD_POST) {
//         //     let newPost = {
//         //         id: 5,
//         //         message: this._state.profilePage.newPostText,
//         //         likesCount: 0
//         //     };
//         //
//         //     this._state.profilePage.posts.push(newPost);
//         //     this._state.profilePage.newPostText = '';
//         // } else if (action.type === UPDATE_NEW_POST_TEXT) {
//         //     this._state.profilePage.newPostText = action.newText;
//         //     this._callSubscriber();
//         // } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
//         //     this._state.dialogsPage.newMessageBody = action.body;
//         //     this._callSubscriber();
//         // } else if (action.type === SEND_MESSAGE) {
//         //     let newMessage = {
//         //         id: 4,
//         //         message: this._state.dialogsPage.newMessageBody,
//         //     };
//         //
//         //     this._state.dialogsPage.messages.push(newMessage);
//         //     this._state.dialogsPage.newMessageBody = '';
//         //    
//         //     this._callSubscriber();
//         // }
//     }
// }
//
// export default store