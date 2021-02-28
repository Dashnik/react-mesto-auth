import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handlesubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onRegister({ email, password });
  }

  const handleChange = (e) => {

    e.target.name === 'register__email' ? setEmail(e.target.value) : ''

    e.target.name === 'register__pwd' ? setPassword(e.target.value) : ''
  }


  return (
    <>
       <Header linkName='Войти' 
        link='/mesto-react/sign-in'
        />
      <form 
      className="login"
      onSubmit={handlesubmit}
      >
        <h2 className="login__label">Регистрация</h2>
        <input 
        type='text'
        className="login__email" 
        placeholder="Email" 
        onChange={handleChange}
        name='register__email'
        />
        <input
          type="password"
          className="login__password"
          placeholder="Пароль"
          onChange={handleChange}
          name='register__pwd'
        />
        <button
          type="submit"
          className="login__submit"
        >
          Зарегистрироваться
        </button>
        <Link to="/mesto-react/sign-in" className="register__text">
          {" "}
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </>
  );
}

export default Register;
