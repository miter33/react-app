import c from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import AddMessageForm from "./AddMessageForm";

const Dialogs = (props) => {
    let addNewMessage = (values) => {
        props.sendMessageClick(values.newMessageBody);
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
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}





export default Dialogs