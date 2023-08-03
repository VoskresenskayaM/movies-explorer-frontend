import React from 'react';
import { Link } from 'react-router-dom';
import './NavTabPopup.css';
import cross from '../../images/cross.svg';
import Account from '../Account/Account';

function NavTabPopup({ isPopupOpen, hendlePopupClose, hendleSavedMovies, hendlNotSavedMovies }) {
    function hendleSaved (){
        hendlePopupClose()
        hendleSavedMovies()
    }

    function hendleNotSaved (){
        hendlePopupClose()
        hendlNotSavedMovies()
    }

    const navTabClass = `navtabpopup ${isPopupOpen ? 'navtabpopup__opened' : ''}`
    return (

        <div className={navTabClass}>
            <nav className='navtabpopup__container' >
                <div className='navtabpopup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <ul className='navtabpopup__list'>
                    <li className='navtabpopup__elem'><Link to="/" className='navtabpopup__elem-value'
                        onClick={hendlePopupClose}>Главная</Link></li>
                    <li className='navtabpopup__elem'><Link to="/movies" className='navtabpopup__elem-value'
                        onClick={hendleNotSaved}>Фильмы</Link></li>
                    <li className='navtabpopup__elem'><Link to="/saved-movies" className='navtabpopup__elem-value'
                        onClick={hendleSaved}>Сохранённые фильмы</Link ></li>
                </ul>
                <Account
                    hendlePopupClose={hendlePopupClose} />
            </nav >
        </div >
    )
}

export default NavTabPopup;
