import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/helpers';

function MoviesCard({ movie, onLikeClick, isLiked, saveMovie, deleteMovie }) {
    const [localIsLiked, setLocalIsLiked] = useState(isLiked);
    const location = useLocation();
    const handleLike = () => {
        if (localIsLiked) {
            deleteMovie(movie.id || movie.movieId)
            setLocalIsLiked((prev) => !prev);
            console.log(movie)
        } else {
            saveMovie(movie)
            setLocalIsLiked((prev) => !prev);
            console.log(movie)
        }
    }

    return (
        <div className='card'>
            <a href={movie.trailerLink} target='_blank' rel='noreferrer' className='card__link'>
            <img alt={movie.nameRU} src={movie.image.url ? 'https://api.nomoreparties.co/' + movie.image.url : movie.image} className='card__image'/>
            </a>
            <div className='card__info'>
                <div className='card__description'>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    {location.pathname === '/movies'
                    ? (<button 
                        className={`card__like-button ${localIsLiked ? 'card__like-button_active' : ''}`} 
                        type='button' 
                        onClick={handleLike}
                        ></button>)
                    : (<button type='button' className='card__delete-button' onClick={() => deleteMovie(movie.id || movie.movieId)}></button>)}
                </div>
                <p className='card__duration'>{formatTime(movie.duration)}</p>
            </div>
        </div>
    );
}

export default MoviesCard;
