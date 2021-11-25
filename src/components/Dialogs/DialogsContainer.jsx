import React from "react";
import {sendMessageClick, newMessageChange} from "../../redux/actions/dialog-actions";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {
    newMessageChange,
    sendMessageClick
    }), withAuthRedirect)(Dialogs);