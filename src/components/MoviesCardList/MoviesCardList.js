import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return(
        <section className='movies-list'>
            <div className='movies-list__grid'>
                <MoviesCard />
            </div>
        </section>
    )
}

export default MoviesCardList;