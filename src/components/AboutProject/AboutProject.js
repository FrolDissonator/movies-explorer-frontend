import './AboutProject.css';

function AboutProject() {
    return(
        <section className='about-project' id='about_project'>
            <div className='section__title-container'>
                <h2 className='section__title'>О проекте</h2>
            </div>
            <div className='about-project__container'>
                <div className='about-project__card'>
                    <p className='about-project__paragraph'>Дипломный проект включал 5 этапов</p>
                    <p className='section__paragraph'>Составление плана, работу над бэкендом, 
                    вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__card'>
                    <p className='about-project__paragraph'>На выполнение диплома ушло 5 недель</p>
                    <p className='section__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, 
                    которые нужно было соблюдать, чтобы успешно защититься.</p>          
                </div>
            </div>
            <div className='about-project__scale'>
                <p className='about-project__bar about-project__bar_color_green'>1 неделя</p>
                <p className='about-project__bar about-project__bar_color_grey'>4 недели</p>
                <p className='about-project__bar about-project__bar_color_black'>Back-end</p>
                <p className='about-project__bar about-project__bar_color_black'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;