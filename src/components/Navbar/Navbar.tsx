import React from "react";
import s from "./navbar.module.scss";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <Link to={""}>
        <img src={logo} alt="" className={s.navbarLogo} />
      </Link>
      <Search />
    </nav>
  );
};

export default Navbar;
