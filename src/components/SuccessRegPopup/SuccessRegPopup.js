import React from 'react';
import './SuccessRegPopup.css';
import cross from '../../images/cross.svg';
import  succsess from '../../images/succsess.svg';

function SuccessRegPopup({ isPopupOpen, hendlePopupClose, successMessage}) {

    const successRegPopupPopupClass = `successregpopup ${isPopupOpen ? 'successregpopup__opened' : ''}`
    return (

        <div className={successRegPopupPopupClass}>
            <div className='successregpopup__container' >
                <div className='successregpopup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <p className='successregpopup__message'>{successMessage}</p>
                <img className='successregpopup__image' src={succsess} alt='успех' />
            </div >
        </div >
    )
}

export default SuccessRegPopup;