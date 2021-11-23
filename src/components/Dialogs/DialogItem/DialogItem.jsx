import c from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    const path = `/dialogs/${props.id}`;
    return (
        <div className={c.dialog + ' ' + c.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem