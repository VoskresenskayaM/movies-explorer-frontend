import React from 'react';
import { Link } from 'react-router-dom';
import './DeleteMoviesPopup.css';
import cross from '../../images/cross.svg';


function DeleteMoviesPopup({ isPopupOpen, hendlePopupClose, heandleDeleteMovies }) {

    const deleteMoviesPopupClass = `deletemoviespopup ${isPopupOpen ? 'deletemoviespopup__opened' : ''}`
    return (

        <div className={deleteMoviesPopupClass}>
            <div className='deletemoviespopup__container' >
                <div className='deletemoviespopup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <p className='deletemoviespopup__question'>Вы действительно хотите удалить фильм?</p>
                <Link to='/saved-movies' className='deletemoviespopup__link'><button className='deletemoviespopup__button' onClick={heandleDeleteMovies}>Удалить</button></Link>
            </div >
        </div >
    )
}

export default DeleteMoviesPopup;
