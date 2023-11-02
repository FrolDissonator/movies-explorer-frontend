import './Footer.css';

function Footer() {
    return(
        <footer className='footer'>
            <p className='footer__copyright footer__copyright_color_grey footer__underline'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
                <p className='footer__copyright footer__copyright_color_white footer__copyright_resolution_mobile'>&copy; 2023</p>
                <div className='footer__sources'>
                    <p className='footer__copyright footer__copyright_color_white footer__copyright_margin'>Яндекс.Практикум</p>
                    <p className='footer__copyright footer__copyright_color_white'>Github</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;