import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(name, email, password);
    }

    return(
        <div className='entrance'>
            <div className='entrance__logo-container'> 
                <img src={logo} alt='логотип проекта' className='header__logo' />
            </div>
            <h2 className='entrance__title'>Добро пожаловать!</h2>
            <form className='entrance__form' onSubmit={handleSubmit}>
                <span className='entrance__placeholder'>Имя</span>
                <input 
                className='entrance__input'
                required
                placeholder=''
                value={name || ''}
                onChange={handleChangeName}
                ></input>
                <span className='entrance__error'></span>
                <span className='entrance__placeholder'>E-mail</span>
                <input 
                className='entrance__input'
                required
                placeholder=''
                value={email || ''}
                onChange={handleChangeEmail}
                autoComplete='username'
                ></input>
                <span className='entrance__error'></span>
                <span className='entrance__placeholder'>Пароль</span>
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
                <button className='entrance__button' type='submit'>Зарегистрироваться</button>
            </form>
            <div className='entrance__caption'>
                <p className='entrance__subtitle'>Уже зарегистрированы?
                    <Link className='entrance__link' to='/signin'>Войти</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
