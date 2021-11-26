import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }
  deactivateEditMode = (e) => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  
  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
        <div>
          {
            this.state.editMode ?
                <div>
                  <input 
                      onChange={this.onChangeStatus}
                      autoFocus
                      onBlur={this.deactivateEditMode} 
                      value={this.state.status}
                  />
                </div> :
                <div>
                  <span onDoubleClick={this.activateEditMode}>{this.props.status ?? 'No status'}</span>
                </div>
          }
        </div>
    )
  }
}

export default ProfileStatus;
