import React from "react";
import "./MenuPopup.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  PAGE_MAIN,
  PAGE_MOVIES,
  PAGE_SAVED_MOVIES,
  PAGE_PROFILE,
} from "../../utils/constants";

function MenuPopup({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <section className={`menu-popup ${isOpen ? "menu-popup_opened" : ""}`}>
      <div className="menu-popup__content">
        <button
          type="button"
          className="menu-popup__close-button"
          onClick={onClose}
        ></button>
        <div className="menu-popup__container">
          <div className="menu-popup__links">
            <NavLink
              to={PAGE_MAIN}
              className={`menu-popup__link ${
                location.pathname === PAGE_MAIN ? "menu-popup__link_active" : ""
              }`}
            >
              Главная
            </NavLink>
            <NavLink
              to={PAGE_MOVIES}
              className={`menu-popup__link ${
                location.pathname === PAGE_MOVIES ? "menu-popup__link_active" : ""
              }`}
            >
              Фильмы
            </NavLink>
            <NavLink
              to={PAGE_SAVED_MOVIES}
              className={`menu-popup__link ${
                location.pathname === PAGE_SAVED_MOVIES
                  ? "menu-popup__link_active"
                  : ""
              }`}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="account account_place_popup">
            <NavLink
              to={PAGE_PROFILE}
              className="account__link account__link_place_popup"
            >
              Аккаунт
              <div className="account__icon account__icon_background_grey"></div>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuPopup;
