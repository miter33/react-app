import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src='https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png' />
            <div className={style.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'} >Login</NavLink>}
            </div>
        </header>
    )
};

export default Header;