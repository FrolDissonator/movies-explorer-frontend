import { useState, useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

function SearchForm({
  searchQuery,
  setSearchQuery,
  error,
  searchResult,
  shortFilmsButton,
  setShortFilmsButton,
}) {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    location.pathname === '/movies' && localStorage.setItem("searchQuery", query);
    setSearchQuery(query);
    console.log(query);
    searchResult(query);
  };

  useEffect(() => {
    location.pathname === '/movies' && setQuery(localStorage.getItem("searchQuery"));
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
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-form__button" type="submit"></button>
          </div>
          <span className="search-form__error">{error}</span>
          <label className="search-form__checkbox-container">
            <input
              type="checkbox"
              className="search-form__checkbox-invisible"
              checked={shortFilmsButton}
            />
            <span
              className="search-form__checkbox-visible"
              onClick={() => {
                setShortFilmsButton((prev) => !prev);
                localStorage.setItem("checkBox", !shortFilmsButton);
              }}
            ></span>
            <span className="search-form__text">Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
