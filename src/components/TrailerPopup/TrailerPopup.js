import React from 'react';
import './TrailerPopup.css';
import cross from '../../images/cross.svg';

function TrailerPopup({ isPopupOpen, hendlePopupClose, selectedMovie }) {
    
    const trailerPopupClass = `trailerpopup ${isPopupOpen ? 'trailerpopup__opened' : ''}`
    const re = /watch/;
    const trailerLink = isPopupOpen ? selectedMovie.trailerLink.replace(re, 'embed') : undefined
    return (
        <div className={trailerPopupClass}>

            <div className='trailerpopup__container'>
                <div className='trailerpopup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <iframe className='trailerpopup__iframe' src= {trailerLink}
                    title={selectedMovie.nameRU}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>

            </div>
        </div >
    )
}

export default TrailerPopup;
