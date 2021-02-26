import React from 'react';
import logo from '../images/header-logo.jpg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип проекта Mesto" />
      <Link className='header__link' to={props.link} >{props.linkName}</Link>
    </header>
  );
}

export default Header;
