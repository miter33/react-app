import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {getIsFetchingSelector} from "../../redux/selectors/users-selectors";

const UsersPage = () => {
    const isFetching = useSelector(getIsFetchingSelector);
    return (
        <>
            {isFetching && <Preloader/>}
            <Users/>
        </>
    );
}

export default UsersPage;