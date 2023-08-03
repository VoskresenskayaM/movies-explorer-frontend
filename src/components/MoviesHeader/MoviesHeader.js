import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './MoviesHeader.css';
import React, { useEffect, useState } from 'react';
import NavTab from '../NavTab/NavTab';


function MoviesHeader({ hendlePopupOpen/*, windowWidth, hendleSavedMovies, hendlNotSavedMovies*/}) {
   const [windowWidthHeader, setWindowWidthHeader] = useState(window.innerWidth);
  /* const [isPageLoading, setIsPageLoading] = useState(false);*/

    useEffect(()=>{
        window.onresize = () => { setWindowWidthHeader(window.innerWidth) };
        /*setIsPageLoading(!isPageLoading)*/
        return () => { window.onresize = false; }
    },[windowWidthHeader/*,isPageLoading*/])
    
    if (windowWidthHeader < 1280)
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
        {/* hendleSavedMovies={hendleSavedMovies}
        hendlNotSavedMovies={hendlNotSavedMovies}*/} 
    </header>)
}
export default MoviesHeader;
