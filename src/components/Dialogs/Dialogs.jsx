import c from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Navigate} from "react-router";

const Dialogs = (props) => {
    let onSendMessageClick = () => {
        props.sendMessageClick();
    }

    let onNewMessageChange = (event) => {
        let text = event.target.value;
        props.newMessageChange(text);
    }
    
    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {
                    props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
                }
            </div>
            <div className={c.messages}>
                <div>
                    {
                        props.messages.map(m => <Message key={m.id} message={m.message}/>)
                    }
                </div>
            </div>
            <div className={c.sendMessage}>
                <div>
                    <textarea
                        placeholder='Enter your message'
                        onChange={onNewMessageChange}
                        value={props.newMessageBody}
                    />
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs