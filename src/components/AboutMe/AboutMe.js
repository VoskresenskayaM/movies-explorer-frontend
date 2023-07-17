import React from 'react';
import MainSubtitle from '../MainSubtitle/MainSubtitle';
import './AboutMe.css';
import me from '../../images/me.jpg';
import PortfolioLink from '../PortfolioLink/PortfolioLink'

function AboutMe() {
    return (
        <div className='aboutme'>
            < MainSubtitle
                text='Студент' />
            <div className='aboutme__container'>
                <div className='aboutme__foto-container'>
                    <img className='aboutme__foto' src={me} alt='фото студента' />
                </div>
                <div className='aboutme__description'>
                    <p className='aboutme__name'>Мария</p>
                    <p className='aboutme__prof'>Фронтенд-разработчик, 44 года</p>
                    <p className='aboutme__me'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку,
                        а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <p className='aboutme__git'>Github</p>
                </div>
            </div>
            <div className='aboutme__portfolio'>
                <h3 className='aboutme__portfolio-title'>Портфолио</h3>
                <div className='aboutme__portfolio-container'>
                    <div className='aboutme__portfolio-blok'>
                        <PortfolioLink
                            name='Статичный сайт'
                            link='https://voskresenskayam.github.io/how-to-learn/' />
                        <PortfolioLink
                            name='Адаптивный сайт'
                            link='https://voskresenskayam.github.io/russian-travel/' />
                        <PortfolioLink
                            name='Одностраничное приложение'
                            link='https://vmm459.nomoredomains.rocks' />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AboutMe;
