import c from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={c.sendMessage}>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder='Enter your message'
                    validate={[requiredField, maxLength50]}
                />
                <div>
                    <button>Send message</button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);