import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, onLikeClick, isLiked }) {
    return (
        <div className='card'>
            <img alt={movie.title} src={movie.image} className='card__image'/>
            <div className='card__info'>
                <div className='card__description'>
                    <h2 className='card__title'>{movie.title}</h2>
                    <button 
                        className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} 
                        type='button' 
                        onClick={onLikeClick}
                    ></button>
                    {/* <button className='card__delete-button'></button> */}
                </div>
                <p className='card__duration'>{movie.duration}</p>
            </div>
        </div>
    );
}

export default MoviesCard;
