import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './MoviesHeader.css';
import React from 'react';
import NavTab from '../NavTab/NavTab'

function MoviesHeader({ hendlePopupOpen, windowWidth }) {

    if (windowWidth < 1280)
        return (
            <header className="moviesheader">
                <Logo />
                <Burger
                    hendlePopupOpen={hendlePopupOpen}
                />
            </header>)
    return (<header className="moviesheader">
        <Logo />
        <NavTab />
    </header>)
}
export default MoviesHeader;
