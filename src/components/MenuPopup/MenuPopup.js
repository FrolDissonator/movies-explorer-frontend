import React from 'react';
import './MenuPopup.css';
import { NavLink, useLocation } from 'react-router-dom';

function MenuPopup({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <section className={`menu-popup ${isOpen ? 'menu-popup_opened' : ''}`}>
            <div className='menu-popup__content'>
                <button type='button' className='menu-popup__close-button' onClick={onClose}></button>
            <div className='menu-popup__container'>
                <div className='menu-popup__links'>
                    <NavLink to='/' className={`menu-popup__link ${location.pathname === '/' ? 'menu-popup__link_active' : ''}`}>Главная</NavLink>
                    <NavLink to='/movies' className={`menu-popup__link ${location.pathname === '/movies' ? 'menu-popup__link_active' : ''}`}>Фильмы</NavLink>
                    <NavLink to='/saved-movies' className={`menu-popup__link ${location.pathname === '/saved-movies' ? 'menu-popup__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                </div>
                <div className='account account_place_popup'>
                    <NavLink to='/profile' className='account__link account__link_place_popup'>Аккаунт
                    <div className='account__icon account__icon_background_grey'></div>
                    </NavLink>
                </div>
            </div>
            </div>
        </section>
    );
}

export default MenuPopup;
