import React from 'react';
import { useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Routes, Route } from 'react-router-dom';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import films from '../../utils/films';
import NavTabPopup from '../NavTabPopup/NavTabPopup';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import EditProfile from '../EdutProfile/EditProfile';
import DeleteMoviesPopup from '../DeleteMoviesPopup/DeleteMoviesPopup';
import Preloader from '../Preloader/Preloader';

function App() {
  const [isSavedList, setIsSavedList] = useState(false);
  const [isMoviesEmpty, setIsMoviesEmpty] = useState(false);

  const hendleSaveMovies = () => {
    setIsSavedList(true)
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);
  const hendlePopupOpen = () => {
    setIsPopupOpen(true)
  }
  const hendlePopupClose = () => {
    setIsPopupOpen(false)
  }

  const hendleDeleteMoviesPopupOpen = () => {
    setIsDeleteMoviesPopupOpen(true)
  }
  const hendleDeleteMoviesPopupClose = () => {
    setIsDeleteMoviesPopupOpen(false)
  }

  const heandleDeleteMovies = () => {
    console.log('удаляем фильм')
    setIsDeleteMoviesPopupOpen(false)
  }

  const [mapForPage, setmapForPage] = React.useState(films);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.onresize = () => { setWindowWidth(window.innerWidth) };
    if (windowWidth >= 1280) {
      setmapForPage(films.slice(0, 12));
    }
    else if (windowWidth < 1280 && windowWidth >= 768) {
      setmapForPage(films.slice(0, 8));
    }
    else { setmapForPage(films.slice(0, 5)); }

    return () => { window.onresize = false };
  }, [windowWidth]);

  const user = {
    name: "Виталий",
    email: "pochta@yandex.ru"
  }

  const [isLoading, setIsLoading] = useState(true)

  return (isLoading ?
    <div className="app">
      <NavTabPopup
        isPopupOpen={isPopupOpen}
        hendlePopupClose={hendlePopupClose} />
      <DeleteMoviesPopup
        isPopupOpen={isDeleteMoviesPopupOpen}
        hendlePopupClose={hendleDeleteMoviesPopupClose}
        heandleDeleteMovies={heandleDeleteMovies}
      />
      <Header
        hendlePopupOpen={hendlePopupOpen}
        windowWidth={windowWidth}
      />
      <Routes>
        <Route path="/" element={<Main
        />} />
        <Route path="/movies" element={<Movies
          isSavedList={isSavedList}
          isMoviesEmpty={isMoviesEmpty}
          mapForPage={mapForPage}
        />} />
        <Route path="/saved-movies" element={<SavedMovies
          hendlePopupOpen={hendleDeleteMoviesPopupOpen}
          isSavedList={hendleSaveMovies}
          isMoviesEmpty={isMoviesEmpty}
          mapForPage={mapForPage}
        />} />
        <Route path="/signup" element={<Register
        />} />
        <Route path="/signin" element={<Login
        />} />
        <Route path="/profile" element={<Profile
          user={user}
          hendlePopupOpen={hendlePopupOpen}
        />} />
        <Route path="/editprofile" element={<EditProfile
          user={user}
        />} />
        <Route path="/*" element={<NotFound
        />} />
      </Routes>
    </div>
    : <Preloader />
  );
}

export default App;
