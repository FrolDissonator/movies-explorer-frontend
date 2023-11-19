import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Loader from "../Loader/Loader";
import {
  MSG_NOT_FOUND,
  MSG_NEED_REQUEST,
  FULL_SCREEN,
  LESS_FULL_SCREEN,
  TABLE_SCREEN,
  LESS_TABLE_SCREEN,
  MAX_MOVIES_FULL_SCREEN,
  MAX_MOVIES_TABLE_SCREEN,
  MAX_MOVIES_PHONE_SCREEN,
  ADD_MOVIES_FULL_SCREEN,
  ADD_MOVIES_TABLE_SCREEN,
  ADD_MOVIES_PHONE_SCREEN,
  SHORT_MOVIE,
} from "../../utils/constants";

function Movies({ isLoading, movies, saveMovie, deleteMovie, saveMovies }) {
  const [visibleCards, setVisibleCards] = useState(getInitialVisibleCards());
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [searchFilms, setSearchFilms] = useState([]);
  const [shortFilmsButton, setShortFilmsButton] = useState(false);
  const [showButton, setShowButton] = useState("");
  const [shortSearchFilms, setShortSearchFilms] = useState([]);

  function getInitialVisibleCards() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= FULL_SCREEN) {
      return MAX_MOVIES_FULL_SCREEN;
    } else if (screenWidth >= TABLE_SCREEN) {
      return MAX_MOVIES_TABLE_SCREEN;
    } else {
      return MAX_MOVIES_PHONE_SCREEN;
    }
  }

  function searchResult(query, isShort) {
    if (!query.trim()) {
      setError(MSG_NEED_REQUEST);
      return;
    }

    const result = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
    const resultShort = movies
      .filter((film) => film.duration < SHORT_MOVIE)
      .filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
    if (!isShort) {
      if (result.length === 0) {
        setError(MSG_NOT_FOUND);
      } else {
        setError("");
      }
    } else {
      if (resultShort.length === 0) {
        setError(MSG_NOT_FOUND);
      } else {
        setError("");
      }
    }
    setSearchFilms(result);
    localStorage.setItem("searchFilms", JSON.stringify(result));
    setShortSearchFilms(resultShort);
    localStorage.setItem("shortSearchFilms", JSON.stringify(resultShort));
  }

  useEffect(() => {
    function handleResize() {
      setVisibleCards(getInitialVisibleCards());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + getIncrement());
  };

  function getIncrement() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= FULL_SCREEN) {
      return ADD_MOVIES_FULL_SCREEN;
    } else if (
      screenWidth <= LESS_FULL_SCREEN &&
      screenWidth >= LESS_TABLE_SCREEN
    ) {
      return ADD_MOVIES_TABLE_SCREEN;
    } else {
      return ADD_MOVIES_PHONE_SCREEN;
    }
  }

  useEffect(() => {
    if (searchFilms.length > MAX_MOVIES_FULL_SCREEN) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [searchFilms]);

  useEffect(() => {
    setSearchQuery(localStorage.getItem("searchQuery"));
    setSearchFilms(JSON.parse(localStorage.getItem("searchFilms")) || []);
    setShortSearchFilms(
      JSON.parse(localStorage.getItem("shortSearchFilms")) || []
    );
    setShortFilmsButton(
      localStorage.getItem("checkBox") === "true" ? true : false
    );
  }, []);

  return (
    <div className="movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        error={error}
        setError={setError}
        searchResult={searchResult}
        shortFilmsButton={shortFilmsButton}
        setShortFilmsButton={setShortFilmsButton}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          movies={
            !shortFilmsButton
              ? searchFilms.slice(0, visibleCards)
              : shortSearchFilms.slice(0, visibleCards)
          }
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          saveMovies={saveMovies}
        />
      )}
      {!shortFilmsButton
        ? searchFilms.length > visibleCards &&
          showButton && <Loader showButton={true} onClick={handleShowMore} />
        : shortSearchFilms.length > visibleCards &&
          showButton && <Loader showButton={true} onClick={handleShowMore} />}
    </div>
  );
}

export default Movies;
