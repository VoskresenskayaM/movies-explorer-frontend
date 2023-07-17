import React from 'react';
import './Techs.css';
import MainSubtitle from '../MainSubtitle/MainSubtitle';

function Techs() {
    return (
        <div className='techs'>
            < MainSubtitle
                text='Технологии' />
            <h3 className='techs__title'>7 технологий</h3>
            <p className='techs__about'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='tech__technologies'>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value  tech__technologie-value-upercase'>html</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value  tech__technologie-value-upercase'>css</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value  tech__technologie-value-upercase'>js</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value'>React</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value'>Git</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value'>Express.js</p>
                </div>
                <div className='tech__technologie'>
                    <p className='tech__technologie-value'>mongoDB</p>
                </div>
            </div>
        </div>
    )
}
export default Techs;
