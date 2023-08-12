import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Account.css';
import account from '../../images/account.svg'

function Account({ hendlePopupClose }) {

    const location = useLocation();

    const navtabpopupAccoutn = location.pathname === '/' ? 'navtabpopup__accoutn  navtabpopup__accoutn_white' : 'navtabpopup__accoutn'
    return (
        <div className='navtabpopup__accoutn-block'>
            <Link to="/profile" className={navtabpopupAccoutn} onClick={hendlePopupClose}>Аккаунт</Link>
            <div className='navtabpopup__accoutn-image-block'>
                <img className='navtabpopup__accoutn-image' src={account} alt='аккаунт' />
            </div>
        </div>)
}

export default Account;
