import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/helpers';

function MoviesCard({ movie, onLikeClick, isLiked }) {
    const location = useLocation();
    return (
        <div className='card'>
            <img alt={movie.nameRU} src={'https://api.nomoreparties.co/' + movie.image.url} className='card__image'/>
            <div className='card__info'>
                <div className='card__description'>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    {location.pathname === '/movies'
                    ? (<button 
                        className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} 
                        type='button' 
                        onClick={onLikeClick}></button>)
                    : (<button type='button' className='card__delete-button'></button>)}
                </div>
                <p className='card__duration'>{formatTime(movie.duration)}</p>
            </div>
        </div>
    );
}

export default MoviesCard;
