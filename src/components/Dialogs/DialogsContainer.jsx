import React from "react";
import {sendMessageClick} from "../../redux/actions/dialog-actions";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {
    sendMessageClick
    }), withAuthRedirect)(Dialogs);