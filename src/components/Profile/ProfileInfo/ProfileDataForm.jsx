import styles from './ProfileInfo.module.css'
import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../../utils/validators/validators";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, userProfile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {<button>save</button>}
            {
                error &&
                <div className={style.errorSummary}>
                    {error}
                </div>
            }
            <div>
                <b>Full name</b>: <Field
                component={Input}
                name='fullName'
                placeholder={userProfile.fullName}
                validate={[requiredField]}
            />
            </div>
            <div>
                <b>Looking for a job</b>: <Field
                type={'checkbox'}
                component={Input}
                name='lookingForAJob'
            />
            </div>
            <div>
                <b>My professional skills</b>: <Field
                component={Textarea}
                name='lookingForAJobDescription'
                placeholder={'My professional skills'}
            />
            </div>
            <div>
                <b>About me</b>: <Field
                component={Textarea}
                name='aboutMe'
                placeholder={'About me'}
            />
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(userProfile.contacts)
                .map(key => {
                    return (
                        <div>
                            <b>{key}: </b>
                            <Field
                                component={Input}
                                name={`contacts.${key}`}
                                placeholder={key}
                            />
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm(
    {
        form: 'profileData'
    }
)(ProfileDataForm);

export default ProfileDataFormReduxForm;