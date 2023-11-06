import React from 'react';
import './MenuPopup.css';
import { NavLink, useLocation } from 'react-router-dom';

function MenuPopup({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <section className={`menu-popup ${isOpen ? 'menu-popup_opened' : ''}`}>
            <button type='button' className='menu-popup__close-button' onClick={onClose}></button>
            <div className='menu-popup__container'>
                <NavLink to='/' className={`menu-popup__link ${location.pathname === '/' ? 'menu-popup__link_active' : ''}`}>Главная</NavLink>
                <NavLink to='/movies' className={`menu-popup__link ${location.pathname === '/movies' ? 'menu-popup__link_active' : ''}`}>Фильмы</NavLink>
                <NavLink to='/saved-movies' className={`menu-popup__link ${location.pathname === '/saved-movies' ? 'menu-popup__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                <div className='header__account header__account_place_popup'>
                    <NavLink to='/profile' className={`header__link header__link_place_account ${location.pathname === '/profile' ? 'menu-popup__link_active' : ''}`}>Аккаунт
                    <div className='header__account-icon header__account-icon_background_grey'></div>
                    </NavLink>
                </div>
            </div>
        </section>
    );
}

export default MenuPopup;
