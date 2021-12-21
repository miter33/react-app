let subscribers = {
  'message-received': [],  
  'status-changed': [],  
};

let ws = null;

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
};

const messageHandler = (e) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages));
};

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error('RESTART PAGE');
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}

const createChannel = () => {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
};

const notifySubscribersAboutStatus = (status) => {
    subscribers['status-changed'].forEach(s => s(status));
}

export const chatApi = {
    start() {
      createChannel();  
    },
    stop() {
        subscribers['message-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName, callback) {
        subscribers[eventName].push(callback);
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName, callback){
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        };
    },
    send(message) {
        ws?.send(message);
    }
}