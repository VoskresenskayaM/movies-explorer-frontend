import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './MoviesHeader.css';
import React from 'react';
import NavTab from '../NavTab/NavTab'

function MoviesHeader({ hendlePopupOpen, windowWidth }) {

    if (windowWidth < 1280)
        return (
            <div className="moviesheader">
                <Logo />
                <Burger
                    hendlePopupOpen={hendlePopupOpen}
                />
            </div>)
    return (<div className="moviesheader">
        <Logo />
        <NavTab />
    </div>)





    /*return (
        <div className="moviesheader">
                    <Logo />
                    {windowWidth<1280 ?   
                    
                    <Burger
                        hendlePopupOpen={hendlePopupOpen}
                    /> : <NavTab/>}
        </div>
    )*/
}
export default MoviesHeader;
