import { useState, useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import { PAGE_MOVIES, MSG_NEED_REQUEST } from "../../utils/constants";

function SearchForm({
  searchQuery,
  setSearchQuery,
  error,
  setError,
  searchResult,
  shortFilmsButton,
  setShortFilmsButton,
}) {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError(MSG_NEED_REQUEST);
      return;
    }
    setError("");
    location.pathname === PAGE_MOVIES && localStorage.setItem("searchQuery", query);
    setSearchQuery(query);
    searchResult(query);
  };

  const handleCheckboxClick = () => {
    setError("");
    setShortFilmsButton((prev) => !prev);
    localStorage.setItem("checkBox", !shortFilmsButton);
    if (query.trim()) {
      searchResult(query);
    }
  };

  useEffect(() => {
    location.pathname === PAGE_MOVIES &&
      setQuery(localStorage.getItem("searchQuery"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSearch} noValidate>
          <div className="search-form__line">
            <input
              className="search-form__input"
              type="search"
              placeholder="Фильм"
              required
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchQuery(e.target.value);
                setError("");
              }}
            />
            <button className="search-form__button" type="submit"></button>
          </div>
          <span className="search-form__error">{error}</span>
          <label className="search-form__checkbox-container">
            <input
              type="checkbox"
              className="search-form__checkbox-invisible"
              checked={shortFilmsButton}
              onClick={handleCheckboxClick}
            />
            <span
              className="search-form__checkbox-visible"
            ></span>
            <span className="search-form__text">Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
