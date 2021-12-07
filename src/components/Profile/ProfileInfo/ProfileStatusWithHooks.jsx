import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        props.personalId === props.userId ?
            <div>
                {
                    editMode ?
                        <div>
                            <input
                                autoFocus
                                onBlur={deactivateEditMode}
                                value={status}
                                onChange={onChangeStatus}
                            />
                        </div> :
                        <div>
                            <span onDoubleClick={activateEditMode}><b>Status</b>: {props.status ?? 'No status'}</span>
                        </div>
                }
            </div> :
            <div>
                <span><b>Status</b>: {props.status ?? 'No status'}</span>
            </div>
    )
}

export default ProfileStatusWithHooks;
