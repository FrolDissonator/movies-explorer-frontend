import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Navigation() {
    return(
        <div className='header__container'>
            <div className='header__links'>
                <img src={logo} alt='логотип проекта' className='header__logo' />
                <Routes>
                    <Route path='/' element={<Link to='/movies' className='header__link'>Фильмы</Link>}></Route>
                    <Route path='/' element={<Link to='/saved-movies' className='header__link'>Сохранённые фильмы</Link>}></Route>
                </Routes>
            </div>
            <div className='header__account'>
                <a href='*' className='header__link header__link_place_account'>Аккаунт
                <div className='header__account-icon'></div>
                </a>                
            </div>
            {/* <div className='header__auth-container'>
                <a href='*' className='header__auth-link'>Регистрация</a>
                <a href='*' className='header__auth-link header__auth-link_type_sign-in'>Войти</a>
            </div> */}
        </div>
    )
}

export default Navigation;