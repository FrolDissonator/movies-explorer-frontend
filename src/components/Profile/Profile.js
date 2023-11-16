import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mainApi from "../../utils/MainApi";
import "./Profile.css";
import { regEmail } from "../../utils/helpers";
import {
  PAGE_LOGIN,
  ERR_ALREADY_EXISTS,
  MSG_VALID_EMAIL,
  MSG_VALID_NAME,
  MSG_PROFILE_SUCCESS,
  MSG_ALREADY_EXISTS,
  MSG_PROFILE_ERR
} from "../../utils/constants";

function Profile({ onSignOut, isLoading, setIsLoading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editedName, setEditedName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [originalEmail, setOriginalEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    success: null,
  });
  console.log(isLoading);

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userInfo) => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setEditedName(userInfo.name);
        setOriginalEmail(userInfo.email);
        setUserName(userInfo.name);
        setUserEmail(userInfo.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setEditedName(value);
      setIsNameValid(value.length >= 2 && value.length <= 30);
      if (userName !== value) {
        setIsFormChanged(true);
      } else {
        setIsFormChanged(false);
      }
    }

    if (name === "email") {
      setEmail(value);
      setIsEmailValid(regEmail.test(value));
      if (userEmail !== value) {
        setIsFormChanged(true);
      } else {
        setIsFormChanged(false);
      }
    }
  };

  const handleEditProfile = () => {
    if (isNameValid && isEmailValid && isFormChanged) {
      setIsLoading(true);
      mainApi
        .setUserInfo(editedName, email)
        .then((updatedUserInfo) => {
          setName(updatedUserInfo.name);
          setOriginalEmail(updatedUserInfo.email);
          setIsFormChanged(false);
          setSubmitStatus({
            message: MSG_PROFILE_SUCCESS,
            success: true,
          });
          console.log(
            "Данные пользователя успешно обновлены:",
            updatedUserInfo
          );
        })
        .catch((err) => {
          console.error("Ошибка при обновлении данных пользователя:", err);
          setSubmitStatus({
            message: err.includes(ERR_ALREADY_EXISTS)
              ? MSG_ALREADY_EXISTS
              : MSG_PROFILE_ERR,
            success: false,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log(
        "Форма содержит некорректные данные или не были внесены изменения"
      );
    }
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form">
        <div className="profile__input-container">
          <label className="profile__label">Имя</label>
          <input
            className={"profile__input"}
            type="text"
            name="name"
            value={editedName}
            onChange={handleInputChange}
            required
          />
          <span className="profile__error">
            {isNameValid
              ? ""
              : MSG_VALID_NAME}
          </span>
        </div>
        <div className="profile__input-container">
          <label className="profile__label">E-mail</label>
          <input
            className={"profile__input"}
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <span className="profile__error">
            {isEmailValid ? "" : MSG_VALID_EMAIL}
          </span>
        </div>
        <span
          className={`profile__result ${
            submitStatus.success ? "" : "profile__result_error"
          }`}
        >
          {submitStatus.message}
        </span>
        <button
          type="button"
          className={`profile__button ${
            !(isNameValid && isEmailValid && isFormChanged)
              ? "profile__button_disabled"
              : ""
          }`}
          disabled={
            isLoading ? true : !(isNameValid && isEmailValid && isFormChanged)
          }
          onClick={handleEditProfile}
        >
          Редактировать
        </button>
      </form>
      <Link className="profile__link" to={PAGE_LOGIN} onClick={onSignOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
