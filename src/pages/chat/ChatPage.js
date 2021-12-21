import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/reducers/chatReducer";

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.chat.status);
    
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);
    
    return (
        <div>
            {
                status === 'error' ? <div>Some error occured. Please refresh the page</div> : 
                <>
                    <Messages/>
                    <AddMessageForm />
                </>
            }
        </div>
    )
}

const Messages = () => {
    const [isAutoScroll, setAutoScroll] = useState(false);
    const messages = useSelector(state => state.chat.messages);
    const messagesAnchorRef = useRef(null);

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef?.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages])
    
    const scrollHandler = (e) => {
        const element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true);
        } else {
            isAutoScroll && setAutoScroll(false);
        }
    }
    
    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map(message => <Message message={message} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message = React.memo( ({message}) => {
    console.log("Message")
    return (
        <div>
            {
                message.photo
                    ? <Avatar src={message.photo} shape="square" size={64} />
                    : <Avatar shape="square" size={64} icon={<UserOutlined/>}/>
            }
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessageForm = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const status = useSelector(state => state.chat.status);
    
    const sendMessageHandler = () => {
        if(message) {
            dispatch(sendMessage(message));
            setMessage('');
        }
    }
    
    return (
        <div>
            <div>
                <textarea onChange={e => setMessage(e.currentTarget.value)} value={message} />
            </div>
            <div>
                <Button
                    type="primary"
                    disabled={status !== 'ready'}
                    onClick={sendMessageHandler}
                >Send</Button>
            </div>
        </div>
    )
}

export default ChatPage;