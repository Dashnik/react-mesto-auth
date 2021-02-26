import React from "react";
import { Link } from "react-router-dom";
import register from "../utils/api";

function Register(props) {
  function handleSubmit(e) {
    e.preventDefault();
    register(email, password);
  }

  return (
    <>
      <form className="login">
        <h2 className="login__label">Регистрация</h2>
        <input className="login__email" placeholder="Email" />
        <input
          type="password"
          className="login__password"
          placeholder="Пароль"
        />
        <button
          type="submit"
          className="login__submit"
          handleSubmit={handleSubmit}
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
