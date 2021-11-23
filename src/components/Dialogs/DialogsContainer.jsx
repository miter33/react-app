import React from "react";
import {sendMessageClick, newMessageChange} from "../../redux/actions/dialog-actions";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

const DialogsContainer = connect(mapStateToProps, {
    newMessageChange,
    sendMessageClick
})(Dialogs);

export default DialogsContainer