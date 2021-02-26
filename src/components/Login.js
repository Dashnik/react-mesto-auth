import React from 'react';


function Login(props) {

  return (
      <>
 
        <form className='login'>
        <h2 className='login__label'>Вход</h2>
        <input className='login__email' placeholder='Email'/>
        <input type="password" className='login__password' placeholder='Пароль'/>
        <button type='submit' className='login__submit'>Войти</button>
            
    </form>
   </> 
    );
}

export default Login;
