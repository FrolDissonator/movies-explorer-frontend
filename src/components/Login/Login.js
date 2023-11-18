import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import { regEmail } from "../../utils/helpers";
import {
  MSG_VALID_EMAIL,
  MSG_VALID_PASSWORD,
  PAGE_REGISTER,
  MIN_LENGTH_PASSWORD,
} from "../../utils/constants";

function Login({ onSubmit, handleResultError, resultError, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const validateEmail = () => {
      if (touched.email || isFormSubmitted) {
        if (regEmail.test(email)) {
          setIsValid((prev) => ({ ...prev, email: true }));
          setErrors((prev) => ({ ...prev, email: "" }));
        } else {
          setIsValid((prev) => ({ ...prev, email: false }));
          setErrors((prev) => ({ ...prev, email: MSG_VALID_EMAIL }));
        }
      }
    };

    const validatePassword = () => {
      if (touched.password || isFormSubmitted) {
        if (password.length >= MIN_LENGTH_PASSWORD) {
          setIsValid((prev) => ({ ...prev, password: true }));
          setErrors((prev) => ({ ...prev, password: "" }));
        } else {
          setIsValid((prev) => ({ ...prev, password: false }));
          setErrors((prev) => ({
            ...prev,
            password: MSG_VALID_PASSWORD,
          }));
        }
      }
    };

    validateEmail();
    validatePassword();
  }, [email, password, touched, isFormSubmitted]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setTouched((prev) => ({ ...prev, password: true }));
  };

  const handleSubmit = (e) => {
    const data = {
      email: email,
      password: password,
    };

    e.preventDefault();
    setIsFormSubmitted(true);
    onSubmit(data, handleResultError);
  };

  return (
    <div className="entrance">
      <div className="entrance__logo-container">
        <img src={logo} alt="логотип проекта" className="logo" />
      </div>
      <h2 className="entrance__title">Рады видеть!</h2>
      <form className="entrance__form" onSubmit={handleSubmit}>
        <label className="entrance__placeholder">E-mail</label>
        <input
          name="email"
          type="email"
          className="entrance__input"
          placeholder="E-mail"
          value={email || ""}
          onChange={handleChangeEmail}
          autoComplete="username"
          required
        />
        <span className="entrance__error">{touched.email && errors.email}</span>
        <label className="entrance__placeholder">Пароль</label>
        <input
          name="password"
          type="password"
          className="entrance__input"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChangePassword}
          autoComplete="current-password"
          required
        />
        <span className="entrance__error">
          {touched.password && errors.password}
        </span>
        <div className="entrance__button-container">
          <span className="entrance__error entrance__error_place_button">
            {resultError}
          </span>
          <button
            type="submit"
            className={`entrance__button ${
              !(isValid.email && isValid.password && !isLoading)
                ? "entrance__button_disabled"
                : ""
            }`}
            disabled={!(isValid.email && isValid.password && !isLoading)}
          >
            Войти
          </button>
        </div>
      </form>
      <div className="entrance__caption">
        <p className="entrance__subtitle">
          Ещё не зарегистрированы?
          <Link className="entrance__link" to={PAGE_REGISTER}>
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
