import React, { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { formatTime } from "../../utils/helpers";
import { PAGE_MOVIES } from "../../utils/constants";

function MoviesCard({ movie, isLiked, saveMovie, deleteMovie }) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleServerLike = () => {
    setLocalIsLiked((prev) => !prev);
  };

  const handleLike = () => {
    setIsLoading(true);

    const callback = (success) => {
      setIsLoading(false);

      if (success) {
        handleServerLike();
      }
    };

    if (localIsLiked) {
      deleteMovie(movie.id || movie.movieId, () => callback(true));
    } else {
      saveMovie(movie, () => callback(true));
    }
  };

  return (
    <div className="card">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img
          alt={movie.nameRU}
          src={
            movie.image.url
              ? "https://api.nomoreparties.co/" + movie.image.url
              : movie.image
          }
          className="card__image"
        />
      </a>
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__title">{movie.nameRU}</h2>
          {location.pathname === PAGE_MOVIES ? (
            <button
              className={`card__like-button ${
                localIsLiked ? "card__like-button_active" : ""
              }`}
              type="button"
              onClick={handleLike}
              disabled={isLoading}
            ></button>
          ) : (
            <button
              type="button"
              className="card__delete-button"
              onClick={handleLike}
              disabled={isLoading}
            ></button>
          )}
        </div>
        <p className="card__duration">{formatTime(movie.duration)}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
