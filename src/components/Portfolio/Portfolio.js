import './Portfolio.css';

function Portfolio() {
    return(
        <section className='portfolio'>
            <h2 className='portfolio__header'>Портфолио</h2>
            <div className='portfolio__links'>
                <a href='https://github.com/FrolDissonator/how-to-learn' target='_blank' rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__link-text'>Статичный сайт</p>
                    <p className='portfolio__link-text'>↗</p>
                </a>
                <a href='https://github.com/FrolDissonator/russian-travel' target='_blank' rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__link-text'>Адаптивный сайт</p>
                    <p className='portfolio__link-text'>↗</p>
                </a>
                <a href='https://github.com/FrolDissonator/react-mesto-api-full-gha' target='_blank' rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__link-text'>Одностраничное приложение</p>
                    <p className='portfolio__link-text'>↗</p>   
                </a>
            </div>
        </section>
    )
}

export default Portfolio;