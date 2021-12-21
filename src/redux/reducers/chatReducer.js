import {MESSAGES_RECEIVED, messagesReceived, STATUS_CHANGED, statusChanged} from "../actions/chat-actions";
import {chatApi} from "../../api/chatApi";

let initialState = {
    messages: [],
    status: 'pending'
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            };
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.status
            };
        default:
            return {
                ...state
            };
    }
}

let _newMessageHandler = null;
const newMessageHandlerCreator = (dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

let _statusChangedHandler = null;
const statusChangedHandlerCreator = (dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status));
        }
    }
    return _statusChangedHandler;
}

export const startMessagesListening = () => async dispatch => {
    chatApi.start();
    chatApi.subscribe('message-received', newMessageHandlerCreator(dispatch));
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListening = () => async dispatch => {
    chatApi.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatApi.stop();
}

export const sendMessage = (message) => async dispatch => {
    chatApi.send(message);
}

export default chatReducer;