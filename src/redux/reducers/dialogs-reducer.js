import {SEND_MESSAGE} from "../actions/dialog-actions";

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 4,
                message: action.newMessageBody,
            };
            
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state;
    }
}

export default dialogsReducer;