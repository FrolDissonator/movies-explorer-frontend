import React from 'react';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navigation() {
    // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const location = useLocation();
    const isGreyBackground = location.pathname !== '/';

    return (
        <div className='header__container'>
            <div className='header__links'>
                <Link to='/' className='header__logo-link'>
                    <img src={logo} alt='логотип проекта' className='header__logo' />
                </Link>
                <Link to='/movies' className='header__link'>Фильмы</Link>
                <Link to='/saved-movies' className='header__link'>Сохранённые фильмы</Link>
            </div>
            {/* {isAuthenticated ? ( */}
                <div className='header__account'>
                    <Link to='/profile' className='header__link header__link_place_account'>Аккаунт
                    <div className={`header__account-icon ${isGreyBackground ? 'header__account-icon_background_grey' : ''}`}></div>
                    </Link>
                </div>
                <button type='button' className='header__menu-button'></button>
            {/* ) : ( */}
                {/* <div className='header__auth-container'>
                    <Link to='/signup' className='header__auth-link'>Регистрация</Link>
                    <Link to='/signin' className='header__auth-link header__auth-link_type_sign-in'>Войти</Link>
                </div>
            )} */}
        </div>
    );
}

export default Navigation;
