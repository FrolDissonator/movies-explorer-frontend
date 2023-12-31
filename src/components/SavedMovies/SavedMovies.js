import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Loader from "../Loader/Loader";
import { MSG_NOT_FOUND, SHORT_MOVIE } from "../../utils/constants";

function SavedMovies({ isLoading, saveMovies, deleteMovie }) {
  const [error, setError] = useState("");
  const [shortFilmsButton, setShortFilmsButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilms, setSearchFilms] = useState(saveMovies);

  function searchResult(query) {
    if (!shortFilmsButton) {
      const result = saveMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
      if (result.length === 0) {
        setError(MSG_NOT_FOUND);
      } else {
        setError("");
      }
      setSearchFilms(result);
    } else {
      const result = saveMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      ).filter((film) => film.duration < SHORT_MOVIE);
      if (result.length === 0) {
        setError(MSG_NOT_FOUND);
      } else {
        setError("");
      }
      setSearchFilms(result);
    }
  }

  useEffect(() => {
    if (shortFilmsButton) {
      if (searchQuery) {
        searchResult(searchQuery);
      } else {
        setSearchFilms((prev) => {
          const shortFilms = saveMovies.filter((film) => film.duration < SHORT_MOVIE);
          if (shortFilms.length === 0) {
            setError(MSG_NOT_FOUND);
          } else {
            setError("");
          }
          return shortFilms;
        });
      }
    } else {
      if (!searchQuery) {
        setSearchFilms(saveMovies);
        if (saveMovies.length === 0) {
          setError(MSG_NOT_FOUND);
        } else {
          setError("");
        }
      }
      searchQuery && searchResult(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortFilmsButton, saveMovies]);

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
          movies={searchFilms}
          deleteMovie={deleteMovie}
          saveMovies={saveMovies}
          searchFilms={searchFilms}
        />
      )}
      <Loader />
    </div>
  );
}

export default SavedMovies;
