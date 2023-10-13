import React from 'react';
import MainSubtitle from '../MainSubtitle/MainSubtitle';
import './AboutMe.css';
import me from '../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className='aboutme'>
            < MainSubtitle
                text='Студент' />
            <div className='aboutme__container'>
                <div className='aboutme__foto-container'>
                    <img className='aboutme__foto' src={me} alt='фото студента' />
                </div>
                <div className='aboutme__description'>
                    <p className='aboutme__name'>Мария</p>
                    <p className='aboutme__prof'>Фронтенд-разработчик, 44 года</p>
                    <p className='aboutme__me'>Я  живу в Перми, закончила машиносторительный факультет ЧГТУ.
                        У меня есть муж, дочь и собака. Я люблю йогу, плаванье,
                        кататься на лыжах. Недавно начала кодить.
                        С 2015 года работала в недвижимости.
                        После того, как прошла курс по веб-разработке,
                        начала заниматься фриланс-заказами и ушла с постоянной работы.</p>
                    <p className='aboutme__git'>Github</p>
                </div>
            </div>
            <Portfolio />
        </section >
    )
}
export default AboutMe;
