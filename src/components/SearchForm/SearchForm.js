import { useState, useEffect } from 'react';
import './SearchForm.css';

function SearchForm({searchQuery, setSearchQuery, error, searchResult, shortFilmsButton, setShortFilmsButton}) {
    const [query, setQuery] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        localStorage.setItem('searchQuery', query);
        setSearchQuery(query);
        searchResult(query);
    }

    useEffect(() => {
        setQuery(localStorage.getItem('searchQuery'));
      }, [])

    return(
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form' onSubmit={handleSearch} >
                    <div className='search-form__line'>
                        <input 
                        className='search-form__input' 
                        type='search' 
                        placeholder='Фильм' 
                        required 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                        <button className='search-form__button' type='submit'></button>
                    </div>
                    <span className='search-form__error'>{error}</span>
                    <label className='search-form__checkbox-container'>
                        <input type='checkbox' className='search-form__checkbox-invisible' checked={shortFilmsButton} />
                        <span className='search-form__checkbox-visible' onClick={() => {
                            setShortFilmsButton((prev) => !prev)
                            localStorage.setItem('checkBox', !shortFilmsButton)
                            }}></span>
                        <span className='search-form__text'>Короткометражки</span>
                    </label>
                </form>
            </div>
        </section>
    )
}

export default SearchForm;