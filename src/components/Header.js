import React from 'react';
import logo from '../images/header-logo.jpg';
import { useHistory } from "react-router-dom";

function Header(props) {

  const history = useHistory();
  const email = localStorage.getItem('email');

  const signOut = () =>{
    history.push(`${props.link}`);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип проекта Mesto" />
      <div className='header__container'>
        <p className='header__email'>{email} </p>
        <button className='header__link' onClick={signOut} >{props.linkName}</button>
      </div>
    </header>
  );
}

export default Header;
