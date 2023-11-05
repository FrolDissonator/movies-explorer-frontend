import React, { useState } from 'react';
import './MoviesCard.css';
import wordsAboutDesign from '../../images/card-33-words.jpg';
import oneHundredYears from '../../images/card-100-years.jpg';
import banksy from '../../images/card-banksy.jpg';
import basquiat from '../../images/card-basquiat.jpg';
import running from '../../images/card-running.jpg';
import bookSellers from '../../images/card-booksellers.jpg';
import germany from '../../images/card-germany.jpg';
import gimmeDanger from '../../images/card-gimme-danger.jpg';
import janes from '../../images/card-janes.jpg';
import beforeJump from '../../images/card-before-jump.jpg';
import harvey from '../../images/card-harvey.jpg';
import waves from '../../images/card-waves.jpg';

function MoviesCard() {
    const [likeActive, setLikeActive] = useState([false, false, false]);

    const handleLikeClick = (index) => {
        const updatedLikes = [...likeActive];
        updatedLikes[index] = !updatedLikes[index];
        setLikeActive(updatedLikes);
    };

    const movies = [
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
        {
            id: 4,
            title: 'Баския: Взрыв реальности',
            duration: '1ч 21м',
            image: basquiat
        },
        {
            id: 5,
            title: 'Бег это свобода',
            duration: '1ч 44м',
            image: running
        },
        {
            id: 6,
            title: 'Книготорговцы',
            duration: '1ч 37м',
            image: bookSellers
        },
        {
            id: 7,
            title: 'Когда я думаю о Германии ночью',
            duration: '1ч 56м',
            image: germany
        },
        {
            id: 8,
            title: 'Gimme Danger: История Игги и The Stooge...',
            duration: '1ч 59м',
            image: gimmeDanger
        },
        {
            id: 9,
            title: 'Дженис: Маленькая девочка грустит',
            duration: '1ч 42м',
            image: janes
        },
        {
            id: 10,
            title: 'Соберись перед прыжком',
            duration: '1ч 10м',
            image: beforeJump
        },
        {
            id: 11,
            title: 'Пи Джей Харви: A dog called money',
            duration: '1ч 4м',
            image: harvey
        },
        {
            id: 12,
            title: 'По волнам: Искусство звука в кино',
            duration: '1ч 7м',
            image: waves
        },
    ];

    return (
        <>
            {movies.map((movie, index) => (
                <div key={movie.id} className='card'>
                    <img alt={movie.title} src={movie.image} className='card__image'/>
                    <div className='card__info'>
                        <div className='card__description'>
                            <h2 className='card__title'>{movie.title}</h2>
                            <button 
                                className={`card__like-button ${likeActive[index] ? 'card__like-button_active' : ''}`} 
                                type='button' 
                                onClick={() => handleLikeClick(index)}
                            ></button>
                        </div>
                        <p className='card__duration'>{movie.duration}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MoviesCard;
