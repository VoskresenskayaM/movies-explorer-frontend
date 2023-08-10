import React, { useState, useCallback, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import NotFoundMap from '../NotFoundMap/NotFoundMap';
import { useGetWindowWidth } from '../../hooks/useGetWindowWidth';

function MoviesCardList({ isSavedList, map, hendlePopupOpen, hendleDeleteMovies,
    hendleSaveMovies, isMainMapLoading, hendleSelectMovies, hendleTrailerPopupOpen }) {

    const [mapForPage, setmapForPage] = useState([]);
    const [currentPage, setCurretPage] = useState(1);
    const [moviesCountPage, setMoviesCountPage] = useState();
    const [isMoviesEmpty, setIsMoviesEmpty] = useState(false);
    const [lastMoviesIndex, setLastMoviesIndex] = useState(0);
    const [mainMap, setMainMap] = useState([]);
    const [marginTop, setMarginTop] = useState(0);
    const [heightBlock, setHeightBlock] = useState(0);
    const [isDisabled, setIsDesabled] = useState(false);
    const [isButtonClick, setIsButtonClick] = useState(false);

    const windowWidth = useGetWindowWidth()

    useEffect(() => {
        setMainMap(map)
    }, [map])

    useEffect(() => {
        if (windowWidth >= 1280) {
            setMarginTop(76)
            setHeightBlock(1172)
        }
        else if (windowWidth < 1280 && windowWidth >= 768) {
            setMarginTop(60)
            setHeightBlock(1128)
        }
        else {
            setMarginTop(60)
            setHeightBlock(1146)
        }
        return () => { window.onresize = false; }
    }, [windowWidth])

    function hendlePaginateMovies() {
        setCurretPage(currentPage + 1)
        if (!isButtonClick) {
            setMarginTop(heightBlock)
        }
        else { setMarginTop(marginTop + heightBlock) }
        setIsButtonClick(true)
    }

    const getCurrentMoviesMap = useCallback((currentPage, moviesCountPage) => {
        setLastMoviesIndex(currentPage * moviesCountPage);
        if (lastMoviesIndex >= mainMap.length) {
            setIsMoviesEmpty(true)
            setLastMoviesIndex(mainMap.length);
            setIsDesabled(true)
        } else {
            setIsMoviesEmpty(false)
            setIsDesabled(false)
        }
        setmapForPage(mainMap.slice(0, lastMoviesIndex));
    }, [lastMoviesIndex, mainMap])

    const getMapForPage = useCallback(() => {
        if (windowWidth >= 1280) {
            setMoviesCountPage(12)
            getCurrentMoviesMap(currentPage, moviesCountPage);
        }
        else if (windowWidth < 1280 && windowWidth >= 768) {
            setMoviesCountPage(8)
            getCurrentMoviesMap(currentPage, moviesCountPage);
        }
        else {
            setMoviesCountPage(5)
            getCurrentMoviesMap(currentPage, moviesCountPage);
        }

    }, [currentPage, windowWidth, moviesCountPage, getCurrentMoviesMap])

    useEffect(() => {
        getMapForPage()
    }, [getMapForPage])

    const moviesCardListButton = isMoviesEmpty ? 'moviesCardList__button  moviesCardList__button-none' :
        'moviesCardList__button'

    return (
        <section className='moviesCardList'>
            {isMainMapLoading ? <NotFoundMap /> :
                <>
                    <ul className='moviesCardList__list'>
                        {mapForPage.map((el, index, _) => (
                            <li key={index}>
                                <MoviesCard
                                    isSavedList={isSavedList}
                                    movie={el}
                                    hendlePopupOpen={hendlePopupOpen}
                                    hendleSelectMovies={hendleSelectMovies}
                                    hendleDeleteMovies={hendleDeleteMovies}
                                    hendleSaveMovies={hendleSaveMovies}
                                    hendleTrailerPopupOpen={hendleTrailerPopupOpen}
                                />
                            </li>
                        )
                        )}
                    </ul>
                    <button className={moviesCardListButton}
                        disabled={isDisabled}
                        style={{ marginTop: `${marginTop}px` }}
                        onClick={hendlePaginateMovies}>Ещё</button>
                </>}
        </section>
    )
}
export default MoviesCardList;
