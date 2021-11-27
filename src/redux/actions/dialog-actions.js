export const SEND_MESSAGE = 'SEND-MESSAGE';

export const sendMessageClick = (newMessageBody) => ({
    type: SEND_MESSAGE,
    newMessageBody
});