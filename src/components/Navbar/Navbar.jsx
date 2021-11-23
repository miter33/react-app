import c from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const setActive = ({ isActive }) =>(isActive ? c.activeLink : null);
    return (
        <nav className={c.nav}>
            <div>
                <NavLink to='/profile' className={setActive}>Profile</NavLink>
            </div>
            <div>
                <NavLink exact to='/dialogs' className={setActive}>Messages</NavLink>
            </div>
            <div>
                <NavLink exact to='/users' className={setActive}>Users</NavLink>
            </div>
            <div>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
        </nav>
    )
};

export default Navbar;