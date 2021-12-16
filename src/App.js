import React from 'react'
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import UsersPage from "./components/Users/UsersPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

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
                            path='/profile/:userId'
                            element={<ProfileContainer/>}
                        />
                        <Route
                            path='/users'
                            element={<UsersPage />}
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
                        <Route
                            path='*'
                            element={<div>404 Not Found</div>}
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
