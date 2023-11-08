import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return(
        <div className='entrance'>
            <div className='entrance__logo-container'> 
                <img src={logo} alt='логотип проекта' className='logo' />
            </div>
            <h2 className='entrance__title'>Рады видеть!</h2>
            <form className='entrance__form' onSubmit={handleSubmit}>
                <label className='entrance__placeholder'>E-mail</label>
                <input 
                className='entrance__input'
                required
                placeholder=''
                value={email || ''}
                onChange={handleChangeEmail}
                autoComplete='username'
                ></input>
                <span className='entrance__error'></span>
                <label className='entrance__placeholder'>Пароль</label>
                <input 
                className='entrance__input'
                required
                type='password'
                placeholder=''
                value={password || ''}
                onChange={handleChangePassword}
                autoComplete='current-password'
                ></input>
                <span className='entrance__error'></span>
                <button className='entrance__button' type='submit'>Войти</button>
            </form>
            <div className='entrance__caption'>
                <p className='entrance__subtitle'>Ещё не зарегистрированы?
                    <Link className='entrance__link' to='/signup'>Регистрация</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
