import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import './Profile.css';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userInfo) => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setEditedName(userInfo.name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setEditedName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const handleEditProfile = () => {
    mainApi.setUserInfo(editedName, email)
      .then((updatedUserInfo) => {
        setName(updatedUserInfo.name);
        console.log('Данные пользователя успешно обновлены:', updatedUserInfo);
      })
      .catch((err) => {
        console.error('Ошибка при обновлении данных пользователя:', err);
      });
  };

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {name}!</h2>
      <form className='profile__form'>
        <div className='profile__input-container'>
          <label className='profile__label'>Имя</label>
          <input
            className='profile__input'
            type='text'
            name='name'
            value={editedName}
            onChange={handleInputChange}
          />
          <span className='profile__error'></span>
        </div>
        <div className='profile__input-container'>
          <label className='profile__label'>E-mail</label>
          <input
            className='profile__input'
            type='email'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <span className='profile__error'></span>
        </div>
        <span className='profile__result profile__result_error'></span>
        <button type='button' className='profile__button' onClick={handleEditProfile}>
          Редактировать
        </button>
      </form>
      <Link className='profile__link' to='/signin' onClick={props.onSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
