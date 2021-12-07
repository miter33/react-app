import Preloader from "../../common/Preloader/Preloader";
import personPhoto from "../../../assets/images/person.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import styles from './ProfileInfo.module.css'
import React, {useState} from "react";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../../utils/validators/validators";
import {Field} from "redux-form";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        console.log(e.target.files[0])
        props.savePhoto(e.target.files[0]);
    }
    
    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        });
    }

    return (
        <div>
            <div>
                <img
                    className={styles.mainPhoto}
                    src={props.userProfile.photos.large ?? personPhoto}
                />
                {props.personalId === props.userProfile.userId && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataForm
                        initialValues={props.userProfile}
                        userProfile={props.userProfile}
                        onSubmit={onSubmit}
                    /> :
                    <ProfileData goToEditMode={() => setEditMode(true)} userProfile={props.userProfile}
                                 personalId={props.personalId}/>}
                {
                    <ProfileStatusWithHooks
                        personalId={props.personalId}
                        userId={props.userProfile.userId}
                        status={props.status}
                        updateUserStatus={props.updateUserStatus}
                    />
                }
            </div>
        </div>
    )
};

const ProfileData = ({userProfile, personalId, goToEditMode}) => {
    return (
        <div>
            {personalId === userProfile.userId && <button onClick={goToEditMode}>edit</button>}
            <div>
                <b>Full name</b>: {userProfile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {userProfile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                userProfile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {userProfile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {userProfile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(userProfile.contacts)
                .map(key =>
                    <Contact key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>)}
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={styles.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

export default ProfileInfo;