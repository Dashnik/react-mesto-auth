import React from 'react';
import Header from "./Header";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handlesubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onLogin({ email, password });
  }

  const handleChange = (e) => {

    e.target.name === 'login__email' ? setEmail(e.target.value) : ''

    e.target.name === 'login__password' ? setPassword(e.target.value) : ''
  }

  return (
      <>
         <Header 
          linkName='Регистрация'
          link='/mesto-react/sign-up'
           />
        <form 
        className='login'
        onSubmit={handlesubmit}>
        <h2 className='login__label'>Вход</h2>
        <input 
        className='login__email'
         placeholder='Email'
         onChange={handleChange}
         name='login__email'
         />
        <input 
        type="password" 
        className='login__password' 
        placeholder='Пароль'
        onChange={handleChange}
        name='login__password'
        />
        <button type='submit' className='login__submit'>Войти</button>
            
    </form>
   </> 
    );
}

export default Login;
