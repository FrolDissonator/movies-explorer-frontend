import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';

function SavedMovies() {
    const [movies] = React.useState([]);

    const shouldShowButton = movies.length > 9;

    return(
        <div className='movies'>
            <SearchForm />
            <Preloader />
            <MoviesCardList movies={movies} />
            <Loader showButton={shouldShowButton} />
        </div>
    );
}

export default SavedMovies;