import "./MoviesCardList.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, saveMovie, deleteMovie, saveMovies }) {
  const [likeActive, setLikeActive] = React.useState(
    new Array(movies.length).fill(false)
  );

  const handleLikeClick = (index) => {
    const updatedLikes = [...likeActive];
    updatedLikes[index] = !updatedLikes[index];
    setLikeActive(updatedLikes);
  };

  const getIsLiked = (movie) => {
    if (movie._id) {
      return true;
    } else {
      return saveMovies.some((item) => {
        return item.movieId === movie.id;
      });
    }
  };

  return (
    <section className="movies-list">
      <div className="movies-list__grid">
        {movies.map((movie, index) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            onLikeClick={() => handleLikeClick(index)}
            isLiked={getIsLiked(movie)}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
    </section>
  );
}

export default MoviesCardList;
