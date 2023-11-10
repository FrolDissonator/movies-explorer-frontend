import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
    return(
        <section className='profile'>
            <h2 className='profile__title'>Привет, Сергей!</h2>
            <form className='profile__form'>
                <div className='profile__input-container'>
                    <label className='profile__label'>Имя</label>
                    <input className='profile__input' />
                </div>
                <div className='profile__input-container'>
                    <label className='profile__label'>E-mail</label>
                    <input className='profile__input' />
                </div>
                <button type='button' className='profile__button'>Редактировать</button>
            </form>
            <Link className='profile__link' to='/signin'>Выйти из аккаунта</Link>
        </section>
    )
}

export default Profile;