import './NavTab.css';

function NavTab() {
    return(
        <section className='navtab'>
            <nav className='navtab__links'>
                <a href='#about_project' className='navtab__link'>О проекте</a>
                <a href='#techs' className='navtab__link'>Технологии</a>
                <a href='#student' className='navtab__link'>Студент</a>
            </nav>
        </section>
    )
}

export default NavTab;