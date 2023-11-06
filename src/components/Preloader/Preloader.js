import React from 'react';
import './Preloader.css';

function Preloader({ showButton }) {
    return(
        <section className='preloader'>
            {showButton && <button className='preloader__button' type='button'>Ещё</button>}
        </section>
    )
}

export default Preloader;
