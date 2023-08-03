import React from 'react';
import './ErrorRegPopup.css';
import cross from '../../images/cross.svg';
import  notSuccsess from '../../images/notSuccsess.svg';

function ErrorRegPopup({ isPopupOpen, hendlePopupClose, errorMessage}) {

 

    const errorRegPopupPopupClass = `erroregpopup ${isPopupOpen ? 'erroregpopup__opened' : ''}`
    return (

        <div className={errorRegPopupPopupClass}>
            <div className='erroregpopup__container' >
                <div className='erroregpopup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <p className='erroregpopup__message'>{errorMessage}</p>
                <img className='erroregpopup__image' src={notSuccsess} alt='ошибка' />
            </div >
        </div >
    )
}

export default ErrorRegPopup;