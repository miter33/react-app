import {SEND_MESSAGE, UPDATE_NEW_MESSAGE_BODY} from "../actions/dialog-actions";

let initialState = {
    dialogs: [
        {id: 1, name: 'Aliaksei'},
        {id: 2, name: 'Victor'},
        {id: 3, name: 'Carlos'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'What`s up?'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: 
        return {
            ...state,
            newMessageBody: action.body
        }
        case SEND_MESSAGE: {
            let newMessage = {
                id: 4,
                message: state.newMessageBody,
            };
            
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state;
    }
}

export default dialogsReducer;