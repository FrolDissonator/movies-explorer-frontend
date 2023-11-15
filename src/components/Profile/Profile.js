import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import './Profile.css';
import { regEmail } from '../../utils/helpers';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editedName, setEditedName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    success: null,
  });

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userInfo) => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setEditedName(userInfo.name);
        setOriginalEmail(userInfo.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setEditedName(value);
      setIsNameValid(value.length >= 2 && value.length <= 30);
    }

    if (name === 'email') {
      setEmail(value);
      setIsEmailValid(regEmail.test(value));
    }

    setIsFormChanged(true);
  };

  const handleEditProfile = () => {
    if (isNameValid && isEmailValid && isFormChanged) {
      mainApi
        .setUserInfo(editedName, email)
        .then((updatedUserInfo) => {
          setName(updatedUserInfo.name);
          setOriginalEmail(updatedUserInfo.email);
          setIsFormChanged(false);
          setSubmitStatus({
            message: 'Информация профиля успешно обновлена.',
            success: true,
          });
          console.log('Данные пользователя успешно обновлены:', updatedUserInfo);
        })
        .catch((err) => {
          console.error('Ошибка при обновлении данных пользователя:', err);
          setSubmitStatus({
            message:
              err.includes('409')
                ? 'Пользователь с таким email уже существует.'
                : 'При обновлении профиля произошла ошибка.',
            success: false,
          });
        });
    } else {
      console.log('Форма содержит некорректные данные или не были внесены изменения');
    }
  };

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {name}!</h2>
      <form className='profile__form'>
        <div className='profile__input-container'>
          <label className='profile__label'>Имя</label>
          <input
            className={'profile__input'}
            type='text'
            name='name'
            value={editedName}
            onChange={handleInputChange}
            required
          />
          <span className='profile__error'>
            {isNameValid ? '' : 'Имя не может быть короче 2 и длиннее 30 символов'}
          </span>
        </div>
        <div className='profile__input-container'>
          <label className='profile__label'>E-mail</label>
          <input
            className={'profile__input'}
            type='email'
            name='email'
            value={email}
            onChange={handleInputChange}
            required
          />
          <span className='profile__error'>
            {isEmailValid ? '' : 'Введите корректный email'}
          </span>
        </div>
        <span className={`profile__result ${submitStatus.success ? '' : 'profile__result_error'}`}>
          {submitStatus.message}
        </span>
        <button
          type='button'
          className={`profile__button ${
            !(isNameValid && isEmailValid && isFormChanged) ? 'profile__button_disabled' : ''
          }`}
          onClick={handleEditProfile}
        >
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
