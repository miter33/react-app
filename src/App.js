import React from 'react'
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
// const HeaderContainer = React.lazy(() => import('./components/Header/HeaderContainer'));

const SuspenseDialogs = withSuspense(DialogsContainer);
class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route
                            path='/dialogs'
                            element={<SuspenseDialogs />}
                        />
                        <Route
                            exact
                            path='/profile'
                            element={<ProfileContainer/>}
                        />
                        <Route
                            exact
                            path='/profile/:userId'
                            element={<ProfileContainer/>}
                        />
                        <Route
                            path='/users'
                            element={<UsersContainer/>}
                        />
                        <Route
                            path='/login'
                            element={<Login/>}
                        />
                        <Route
                            exact
                            path='/'
                            element={<Navigate to={'/profile'}/>}
                        />
                    </Routes>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}))(App);
