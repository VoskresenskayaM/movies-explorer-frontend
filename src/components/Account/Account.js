import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import account from '../../images/account.svg'

function Account({ hendlePopupClose }) {
    return (
        <div className='navtabpopup__accoutn-block'>
            <Link to="/profile" className='navtabpopup__accoutn' onClick={hendlePopupClose}>Аккаунт</Link>
            <div className='navtabpopup__accoutn-image-block'>
                <img className='navtabpopup__accoutn-image' src={account} alt='аккаунт' />
            </div>
        </div>)
}

export default Account;
