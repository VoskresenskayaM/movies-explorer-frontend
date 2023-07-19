import React from 'react';
import './AboutProject.css';
import MainSubtitle from '../MainSubtitle/MainSubtitle'

function AboutProject() {
    return (
        <section className='aboutProject' id="aboutProject-section">
            < MainSubtitle
                text='О проекте' />
            <div className='aboutProject__description-tab'>
                <div className='aboutProject__description'>
                    <p className='aboutProject__description-title'>
                        Дипломный проект включал 5 этапов</p>
                    <p className='aboutProject__description-value'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='aboutProject__description'>
                    <p className='aboutProject__description-title'>На выполнение диплома ушло 5 недель</p>
                    <p className='aboutProject__description-value'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutProject__deadline'>
                <div className='aboutProject__deadline-item-color  aboutProject__deadline-item-color-green'>
                    <p className='aboutProject__deadline-item'>1 неделя</p>
                </div>
                <div className='aboutProject__deadline-item-color  aboutProject__deadline-item-color-grey'>
                    <p className='aboutProject__deadline-item'>4 недели</p>
                </div>
                <div className='aboutProject__deadline-item-color'>
                    <p className='aboutProject__deadline-item-work'>Back-end</p>
                </div>
                <div className='aboutProject__deadline-item-color'>
                    <p className='aboutProject__deadline-item-work'>Front-end</p>
                </div>
            </div>
        </section>
    )
}
export default AboutProject;

