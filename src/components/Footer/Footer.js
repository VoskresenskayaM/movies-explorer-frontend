import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <div className="footer__yandex-info">
                    <a href='https://practicum.yandex.ru/' className='footer__yandex-link' target="_blank" rel="noopener noreferrer">
                        Яндекс.Практикум
                    </a>
                    <a href='https://github.com/yandex-praktikum' className='footer__yandex-link' target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                </div>
                <p className="footer__year"> 2023</p>
            </div>
        </footer>
    )
}

export default Footer;
