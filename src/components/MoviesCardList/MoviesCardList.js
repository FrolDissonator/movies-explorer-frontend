import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
    const [likeActive, setLikeActive] = React.useState(new Array(movies.length).fill(false));

    const handleLikeClick = (index) => {
        const updatedLikes = [...likeActive];
        updatedLikes[index] = !updatedLikes[index];
        setLikeActive(updatedLikes);
    };

    return (
        <section className='movies-list'>
            <div className='movies-list__grid'>
                {movies.map((movie, index) => (
                    <MoviesCard
                        key={movie.id}
                        movie={movie}
                        onLikeClick={() => handleLikeClick(index)}
                        isLiked={likeActive[index]}
                    />
                ))}
            </div>
        </section>
    );
}

export default MoviesCardList;