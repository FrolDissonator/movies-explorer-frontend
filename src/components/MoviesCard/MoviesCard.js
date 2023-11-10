import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, onLikeClick, isLiked }) {
    const location = useLocation();

    return (
        <div className='card'>
            <img alt={movie.title} src={movie.image} className='card__image'/>
            <div className='card__info'>
                <div className='card__description'>
                    <h2 className='card__title'>{movie.title}</h2>
                    {location.pathname === '/movies'
                    ? (<button 
                        className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} 
                        type='button' 
                        onClick={onLikeClick}></button>)
                    : (<button type='button' className='card__delete-button'></button>)}
                </div>
                <p className='card__duration'>{movie.duration}</p>
            </div>
        </div>
    );
}

export default MoviesCard;
