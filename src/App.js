import React from 'react'
import './App.css';
import {Link, Navigate, Route, Routes} from "react-router-dom";
import UsersPage from "./components/Users/UsersPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import 'antd/dist/antd.css';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import AppHeader from "./components/Header/AppHeader";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const SuspenseDialogs = withSuspense(DialogsContainer);

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        const {SubMenu} = Menu;
        const {Content, Footer, Sider} = Layout;
        return (
            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className='app-wrapper-content'>
            //         <Routes>
            //             <Route
            //                 path='/dialogs'
            //                 element={<SuspenseDialogs />}
            //             />
            //             <Route
            //                 exact
            //                 path='/profile'
            //                 element={<ProfileContainer/>}
            //             />
            //             <Route
            //                 path='/profile/:userId'
            //                 element={<ProfileContainer/>}
            //             />
            //             <Route
            //                 path='/users'
            //                 element={<UsersPage />}
            //             />
            //             <Route
            //                 path='/login'
            //                 element={<Login/>}
            //             />
            //             <Route
            //                 exact
            //                 path='/'
            //                 element={<Navigate to={'/profile'}/>}
            //             />
            //             <Route
            //                 path='*'
            //                 element={
            //                     <div>
            //                         404 Not Found
            //                         <Button type={"primary"} danger>Ok</Button>
            //                     </div>
            //                 }
            //             />
            //         </Routes>
            //     </div>
            // </div>
            <Layout>
                <AppHeader />
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link exact to='/dialogs'>Messages</Link></Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5"><Link exact to='/developers'>Users</Link></Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Routes>
                                <Route
                                    path='/dialogs'
                                    element={<SuspenseDialogs/>}
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
                                    path='/developers'
                                    element={<UsersPage/>}
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
                                    element={
                                        <div>
                                            404 Not Found
                                            <Button type={"primary"} danger>Ok</Button>
                                        </div>
                                    }
                                />
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}))(App);
