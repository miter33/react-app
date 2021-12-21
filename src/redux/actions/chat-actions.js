export const MESSAGES_RECEIVED = 'MESSAGES-RECEIVED';
export const STATUS_CHANGED = 'STATUS-CHANGED';

export const messagesReceived = (messages) => ({
    type: MESSAGES_RECEIVED,
    messages
});

export const statusChanged = (status) => ({
    type: STATUS_CHANGED,
    status
});