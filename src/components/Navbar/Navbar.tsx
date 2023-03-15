import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {setSearchValue} from "../../redux/slices/searchTrackSlice";
import Search from "../Search/Search";
import s from "./navbar.module.scss";
import logo from "../../assets/img/logo.svg";

const Navbar = () => {

    const dispatch = useAppDispatch()
    const location = useLocation()

    const onClickHandler = () => {
        location.pathname !== '/' && dispatch(setSearchValue(''))
        dispatch(setSearchValue(''))
    }

    return (
        <nav className={s.navbar}>
            <Link to={""} onClick={onClickHandler}>
                <img src={logo} alt="" className={s.navbarLogo}/>
            </Link>
            <Search/>
        </nav>
    );
};

export default Navbar;
