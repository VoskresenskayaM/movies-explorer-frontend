import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import Account from '../Account/Account';

function NavTab() {

    return (
        <nav className='navtab__container'>
            <ul className='navtab__list'>
                <li><Link to="/movies" className='navtab__elem-value'>Фильмы</Link></li>
                <li><Link to="/saved-movies" className='navtab__elem-value'>Сохранённые фильмы</Link ></li>
            </ul>
            <Account />
        </nav >
    )
}

export default NavTab;