import Header from "./Header";
import React from 'react'
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/reducers/auth-reducer";

class HeaderContainer extends React.Component{
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth, 
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logoutThunkCreator})(HeaderContainer);