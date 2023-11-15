import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';

function SavedMovies({isLoading, saveMovies, deleteMovie}) {
    return(
        <div className='movies'>
            <SearchForm />
            {isLoading && <Preloader />}
            {!isLoading && <MoviesCardList movies={saveMovies} deleteMovie={deleteMovie} saveMovies={saveMovies} />}
            <Loader />
        </div>
    );
}

export default SavedMovies;