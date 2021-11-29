import style from './Header.module.css';
import {Navigate, NavLink} from "react-router-dom";

const Header = (props) => {
    let logout = () => {
        props.logoutThunkCreator();
        if(!props.isAuth) {
            return <Navigate to={'/login'} />
        }
    }
    return (
        <header className={style.header}>
            <img src='https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png' />
            <div className={style.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={logout}>Logout</button></div> : <NavLink to={'/login'} >Login</NavLink>}
            </div>
        </header>
    )
};

export default Header;