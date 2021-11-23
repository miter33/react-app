import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/actions/dialog-actions";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        newMessageChange: (text) => {
            dispatch(updateNewMessageBodyCreator(text));
        },
        sendMessageClick: () => {
            dispatch(sendMessageActionCreator());
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer