import {Navigate} from "react-router";
import React from "react";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) {
                return <Navigate to={'/login'} />
            }
        
            return <Component {...this.props} />
        }
    }

    let mapStateToPropsForRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}