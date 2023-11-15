import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import { regEmail } from '../../utils/helpers';

function Register({ onSubmit }) {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const { name, email, password } = data;

    const validateEmail = () => {
      if (touched.email) {
        if (regEmail.test(email)) {
          setIsValid((prev) => ({ ...prev, email: true }));
          setErrors((prev) => ({ ...prev, email: '' }));
        } else {
          setIsValid((prev) => ({ ...prev, email: false }));
          setErrors((prev) => ({ ...prev, email: 'Введите корректный email' }));
        }
      }
    };

    const validatePassword = () => {
      if (touched.password) {
        if (password.length >= 8) {
          setIsValid((prev) => ({ ...prev, password: true }));
          setErrors((prev) => ({ ...prev, password: '' }));
        } else {
          setIsValid((prev) => ({ ...prev, password: false }));
          setErrors((prev) => ({ ...prev, password: 'Пароль не может быть короче 8 символов' }));
        }
      }
    };

    const validateName = () => {
      if (touched.name) {
        if (name.length >= 2 && name.length <= 30) {
          setIsValid((prev) => ({ ...prev, name: true }));
          setErrors((prev) => ({ ...prev, name: '' }));
        } else {
          setIsValid((prev) => ({ ...prev, name: false }));
          setErrors((prev) => ({ ...prev, name: 'Имя не может быть короче 2 и длиннее 30 символов' }));
        }
      }
    };

    validateEmail();
    validatePassword();
    validateName();
  }, [data, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className='entrance'>
      <div className='entrance__logo-container'>
        <img src={logo} alt='логотип проекта' className='logo' />
      </div>
      <h2 className='entrance__title'>Добро пожаловать!</h2>
      <form className='entrance__form' onSubmit={handleSubmit}>
        <label className='entrance__placeholder'>Имя</label>
        <input 
          name='name' 
          type='text' 
          className='entrance__input' 
          placeholder='Имя' 
          onChange={handleChange} 
          required 
        />
        <span className='entrance__error'>{touched.name && errors.name}</span>
        <label className='entrance__placeholder'>E-mail</label>
        <input 
          name='email' 
          type='email' 
          className='entrance__input' 
          placeholder='E-mail' 
          onChange={handleChange} 
          required 
        />
        <span className='entrance__error'>{touched.email && errors.email}</span>
        <label className='entrance__placeholder'>Пароль</label>
        <input 
          name='password' 
          type='password' 
          className='entrance__input' 
          placeholder='Пароль' 
          onChange={handleChange} 
          required 
        />
        <span className='entrance__error'>{touched.password && errors.password}</span>
        <div className='entrance__button-container'>
          <span className='entrance__error entrance__error_place_button'></span>
          <button 
            type='submit' 
            className={`entrance__button ${!(isValid.name && isValid.email && isValid.password) ? 'entrance__button_disabled' : ''}`} 
            disabled={!(isValid.name && isValid.email && isValid.password)}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className='entrance__caption'>
        <p className='entrance__subtitle'>Уже зарегистрированы?
          <Link className='entrance__link' to='/signin'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
