import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';
import Loader from '../Loader/Loader';
import wordsAboutDesign from '../../images/card-33-words.jpg';
import oneHundredYears from '../../images/card-100-years.jpg';
import banksy from '../../images/card-banksy.jpg';

function SavedMovies() {
    const [movies] = React.useState([
        {
            id: 1,
            title: '33 слова о дизайне',
            duration: '1ч 47м',
            image: wordsAboutDesign
        },
        {
            id: 2,
            title: 'Киноальманах «100 лет дизайна»',
            duration: '1ч 3м',
            image: oneHundredYears
        },
        {
            id: 3,
            title: 'В погоне за Бенкси',
            duration: '1ч 42м',
            image: banksy
        },
    ]);

    const shouldShowButton = movies.length > 9;

    return(
        <div className='movies'>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList movies={movies} />
            <Loader showButton={shouldShowButton} />
        </div>
    );
}

export default SavedMovies;