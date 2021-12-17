import {Link, Navigate} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunkCreator} from "../../redux/reducers/auth-reducer";

const AppHeader = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const login = useSelector(state => state.auth.login);
    const dispatch = useDispatch();

    let logout = () => {
        dispatch(logoutThunkCreator());
        if (!isAuth) {
            return <Navigate to={'/login'}/>
        }
    }


    const {Header} = Layout;
    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link exact to='/developers'>Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>Logout</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>

        // <header className={style.header}>
        // <img src='https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png' />
        //     <div className={style.loginBlock}>
        //         {props.isAuth ? <div>{props.login} - <button onClick={logout}>Logout</button></div> : <NavLink to={'/login'} >Login</NavLink>}
        //     </div>
        // </header>
    )
};

export default AppHeader;