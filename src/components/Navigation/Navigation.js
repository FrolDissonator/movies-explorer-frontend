import React, { useContext, useState } from "react";
import "./Navigation.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import MenuPopup from "../MenuPopup/MenuPopup";
import CurrentUserContext from "../../context/CurrentUserContext";
import {
  PAGE_LOGIN,
  PAGE_REGISTER,
  PAGE_MOVIES,
  PAGE_SAVED_MOVIES,
  PAGE_PROFILE,
  PAGE_MAIN,
} from "../../utils/constants";

function Navigation({loggedIn}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isGreyBackground = location.pathname !== "/";
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setMenuPopupOpen(true);
  };

  const closeMenuPopup = () => {
    setMenuPopupOpen(false);
  };
  return (
    <div className="header__container">
      <div className="header__links">
        <Link to={PAGE_MAIN} className="header__logo-link">
          <img src={logo} alt="логотип проекта" className="logo" />
        </Link>
        {currentUser && loggedIn && (
          <>
            <Link to={PAGE_MOVIES} className="header__link">
              Фильмы
            </Link>
            <Link to={PAGE_SAVED_MOVIES} className="header__link">
              Сохранённые фильмы
            </Link>
          </>
        )}
      </div>
      {currentUser && loggedIn ? (
        <>
          <div className="account">
            <Link to={PAGE_PROFILE} className="account__link">
              Аккаунт
              <div
                className={`account__icon ${
                  isGreyBackground ? "account__icon_background_grey" : ""
                }`}
              ></div>
            </Link>
          </div>
          <button
            type="button"
            className="header__menu-button"
            onClick={handleMenuButtonClick}
          ></button>
          <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenuPopup} />
        </>
      ) : (
        <div className="header__auth-container">
          <Link to={PAGE_REGISTER} className="header__auth-link">
            Регистрация
          </Link>
          <Link
            to={PAGE_LOGIN}
            className="header__auth-link header__auth-link_type_sign-in"
          >
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
