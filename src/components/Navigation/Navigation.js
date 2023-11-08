import React, { useState } from 'react';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import MenuPopup from '../MenuPopup/MenuPopup';

function Navigation() {
    const [isLoggedIn] = React.useState(false);
    const location = useLocation();
    const isGreyBackground = location.pathname !== '/';
    const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

    const handleMenuButtonClick = () => {
        setMenuPopupOpen(true);
    };

    const closeMenuPopup = () => {
        setMenuPopupOpen(false);
    };

    return (
        <div className='header__container'>
            <div className='header__links'>
                <Link to='/' className='header__logo-link'>
                    <img src={logo} alt='логотип проекта' className='logo' />
                </Link>
                <Link to='/movies' className='header__link'>Фильмы</Link>
                <Link to='/saved-movies' className='header__link'>Сохранённые фильмы</Link>
            </div>
            {isLoggedIn ? (
                <>
                <div className='account'>
                    <Link to='/profile' className='header__link header__link_place_account'>Аккаунт
                    <div className={`account__icon ${isGreyBackground ? 'account__icon_background_grey' : ''}`}></div>
                    </Link>
                </div>
                <button type='button' className='header__menu-button'  onClick={handleMenuButtonClick}></button>
                <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenuPopup} />
                </>
            ) : (
                <div className='header__auth-container'>
                    <Link to='/signup' className='header__auth-link'>Регистрация</Link>
                    <Link to='/signin' className='header__auth-link header__auth-link_type_sign-in'>Войти</Link>
                </div>
            )}
        </div>
    );
}

export default Navigation;
