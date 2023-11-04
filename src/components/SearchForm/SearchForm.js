import './SearchForm.css';

function SearchForm() {
    return(
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form'>
                    <input className='search-form__input' type='search' placeholder='Фильм' />
                    <button className='search-form__button' type='submit'></button>
                </form>
            </div>
            <div className='search-form__checkbox-container'>
                    
            </div>
        </section>
    )
}

export default SearchForm;