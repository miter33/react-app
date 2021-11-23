export const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
export const SEND_MESSAGE = 'SEND-MESSAGE';

export const newMessageChange = (text) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
})

export const sendMessageClick = () => ({
    type: SEND_MESSAGE
});