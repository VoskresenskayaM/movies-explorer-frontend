import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState, useCallback } from 'react';
import mainApi from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';
import DeleteMoviesPopup from '../DeleteMoviesPopup/DeleteMoviesPopup';
import { findSavedMovies } from '../../utils/Movies';


import './SavedMovies.css';

function SavedMovies({mainSavedMap, windowWidth}) {

  
   const [isMainMapLoading, setIsMainMapLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [mainMap, setMainMap] = useState([])
    const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);
    const [searchMovie, setSearchMovie] = useState('')

    const hendleDeleteMoviesPopupOpen = () => {
        setIsDeleteMoviesPopupOpen(true)
    }
    const hendleDeleteMoviesPopupClose = () => {
        setIsDeleteMoviesPopupOpen(false)
    }

    function hendleFindMovies(movieName, isShortFilm) {
        console.log(mainMap)
        setIsLoading(false)
        const foundMap = findSavedMovies(movieName, isShortFilm, mainMap/*, mapLocalStorage*/)
        if (foundMap.length === 0) {
            setIsMainMapLoading(true)
            setMainMap(foundMap)
            setIsLoading(true)
        }
        else {
            setMainMap(foundMap)
            setIsLoading(true)
            setIsMainMapLoading(false)
        }
    }

    useEffect(() => {
        /*mainApi.getMovies()
            .then((movies) => {
                setMainMap(movies.data)
                setIsLoading(true)
            })
            .catch((e) => {
                console.log(e)
            })*/
            setMainMap(mainSavedMap)
            setIsLoading(true)
    }, [mainSavedMap])

    /*удаление фильма*/
    const [selectedMovie, setSelectedMovie] = useState({})

    function hendleSelectMovies(movie) {
        setSelectedMovie(movie)
    }

    const hendleDeleteMovies = () => {

        mainApi.deleteMovies(selectedMovie._id)
            .then(() => {
                const map = mainMap.filter(m => m._id !== selectedMovie._id)
                setMainMap(map)
                hendleDeleteMoviesPopupClose()
            })
            .catch((err) =>
                console.log(err))
    }

    return (
        <>
            <DeleteMoviesPopup
                isPopupOpen={isDeleteMoviesPopupOpen}
                hendlePopupClose={hendleDeleteMoviesPopupClose}
                hendleDeleteMovies={hendleDeleteMovies}
            />
            <main className='savedMovies'>
                <SearchForm 
                 hendleFindMovies={hendleFindMovies}
                 searchMovie={searchMovie} />
                {isLoading ?
                    <MoviesCardList
                        isSavedList={true}
                        /*isMoviesEmpty={isMoviesEmpty}
                        mapForPage={mapForPage}*/
                        hendlePopupOpen={hendleDeleteMoviesPopupOpen}
                        map={mainMap}
                        hendleSelectMovies={hendleSelectMovies}
                        isMainMapLoading={isMainMapLoading}
                        /*windowWidth={windowWidth}*/
                    /*hendlePaginateMovies={hendlePaginateMovies}*/
                    />
                    : <Preloader />}
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;