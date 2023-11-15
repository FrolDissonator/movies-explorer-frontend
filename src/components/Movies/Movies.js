import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';

function Movies({ isLoading, movies, saveMovie, deleteMovie, saveMovies }) {
  const [visibleCards, setVisibleCards] = useState(getInitialVisibleCards());
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [searchFilms, setSearchFilms] = useState([]);
  const [shortFilmsButton, setShortFilmsButton] = useState(false);
  const [showButton, setShowButton] = useState('');

  function getInitialVisibleCards() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  function searchResult(query) {
    const result = movies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
      if (result.length === 0) {
        setError('Ничего не найдено');
      } else {
        setError('')
      }
      setSearchFilms(result);
      localStorage.setItem('searchFilms', JSON.stringify(result));
  }

  useEffect(() => {
    function handleResize() {
      setVisibleCards(getInitialVisibleCards());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + getIncrement());
  };

  function getIncrement() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 3;
    } else if (screenWidth <= 1278 && screenWidth >= 766 ) {
        return 2;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    if (searchFilms.length > 12) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [searchFilms]);

  useEffect(() => {
    setSearchQuery(localStorage.getItem('searchQuery'));
    setSearchFilms(JSON.parse(localStorage.getItem('searchFilms')) || []);
    setShortFilmsButton(localStorage.getItem('checkBox') === 'true' ? true : false);
  }, [])

  useEffect(() => {
    if (shortFilmsButton) {
        setSearchFilms((prev) => {
          return prev.filter((film) => film.duration < 40)
        })
    } else {
        setSearchFilms(JSON.parse(localStorage.getItem('searchFilms')) || []);
    }
  }, [shortFilmsButton])

  return (
    <div className='movies'>
      <SearchForm 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      error={error} 
      searchResult={searchResult} 
      shortFilmsButton={shortFilmsButton}
      setShortFilmsButton={setShortFilmsButton} />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList movies={searchFilms.slice(0, visibleCards)} saveMovie={saveMovie} deleteMovie={deleteMovie} saveMovies={saveMovies} />}
      {searchFilms.length > visibleCards && showButton && <Loader showButton={true} onClick={handleShowMore} />}
    </div>
  );
}

export default Movies;