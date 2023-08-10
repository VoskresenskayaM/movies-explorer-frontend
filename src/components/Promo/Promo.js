import React from 'react';
import './Promo.css';
import Earth from '../../images/Earth.svg'
import { HashLink as Link } from 'react-router-hash-link';


function Promo() {
    return (
        <section className='promo'>
            <div className='promo__container'>
                <img className='promo__earth' src={Earth} alt='earth' />
                <div className='promo__title-container'>
                    <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <Link to="#aboutProject-section" className='promo__button'>Узнать больше</Link>
                </div>
            </div>
        </section>
    )
}

export default Promo;
