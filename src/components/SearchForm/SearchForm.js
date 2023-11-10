import './SearchForm.css';

function SearchForm() {
    return(
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form'>
                    <div className='search-form__line'>
                        <input className='search-form__input' type='search' placeholder='Фильм' required />
                        <button className='search-form__button' type='submit'></button>
                    </div>
                    <label className='search-form__checkbox-container'>
                        <input type='checkbox' className='search-form__checkbox-invisible' />
                        <span className='search-form__checkbox-visible'></span>
                        <span className='search-form__text'>Короткометражки</span>
                    </label>
                </form>
            </div>
        </section>
    )
}

export default SearchForm;