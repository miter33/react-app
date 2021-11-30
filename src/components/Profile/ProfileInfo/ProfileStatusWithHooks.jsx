import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {
    // state = {
    //   editMode: false,
    //   status: this.props.status
    // }
    // deactivateEditMode = (e) => {
    //   this.setState({
    //     editMode: false
    //   })
    //   this.props.updateUserStatus(this.state.status)
    // }
    //
    // activateEditMode = () => {
    //   this.setState({
    //     editMode: true
    //   })
    // }
    //
    // onChangeStatus = (e) => {
    //   this.setState({
    //     status: e.target.value
    //   })
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   if(prevProps.status !== this.props.status) {
    //     this.setState({
    //       status: this.props.status
    //     })
    //   }
    // }

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
