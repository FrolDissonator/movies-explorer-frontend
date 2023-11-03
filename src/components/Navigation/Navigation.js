import './Navigation.css';
import logo from '../../images/logo.svg';

function Navigation() {
    return(
        <div className='header__container'>
            <img src={logo} alt='логотип' className='header__logo' />
        </div>
    )
}

export default Navigation;