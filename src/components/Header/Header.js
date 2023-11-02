import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
    return(
        <header className='header'>
            <div className='header__container'>
                <img src={logo} alt='логотип' className='header__logo' />
            </div>
        </header>
    );
}

export default Header;