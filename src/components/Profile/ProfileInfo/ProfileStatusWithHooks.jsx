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
                        <span onDoubleClick={activateEditMode}>{props.status ?? 'No status'}</span>
                    </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
