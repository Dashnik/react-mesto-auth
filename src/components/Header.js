import React from 'react';
import logo from '../images/header-logo.jpg';
import { Link } from "react-router-dom";
import {  UserEmailContext } from "../contexts/CurrentUserContext";


function Header(props) {

  const currentEmail = React.useContext(UserEmailContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип проекта Mesto" />
      <p className='header__link'>{currentEmail} </p>
      <Link className='header__link' to={props.link} >{props.linkName}</Link>
    </header>
  );
}

export default Header;
