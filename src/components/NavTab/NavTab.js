import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavTab.css';
import Account from '../Account/Account';

function NavTab() {

    const location = useLocation();
    
    const navTabElemValue = location.pathname === '/' ? 'navtab__elem-value  navtab__elem-value_white' : 'navtab__elem-value';
    return (
        <nav className='navtab__container'>
            <ul className='navtab__list'>
                <li><Link to="/movies" className={navTabElemValue}>Фильмы</Link></li>
                <li><Link to="/saved-movies" className={navTabElemValue}>Сохранённые фильмы</Link ></li>
            </ul>
            <Account />
        </nav >
    )
}

export default NavTab;
