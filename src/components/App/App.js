import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NavTabPopup from '../NavTabPopup/NavTabPopup';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import EditProfile from '../EdutProfile/EditProfile';
import SuccessRegPopup from '../SuccessRegPopup/SuccessRegPopup';
import ErrorRegPopup from '../ErrorRegPopup/ErrorRegPopup';
import { register, authorize, getCurrentUser } from "../../utils/AuthApi";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../context/currentUserContext';
import { TOO_MANY_REQUESTS, SUCCESS_REGISTRATION, SUCCESS_EDIT_USER } from '../../utils/Constants';
import { useLocation } from "react-router-dom";
import ProtectedRouteElement from '../../utils/ProtectedRouteElement';
import beatFilmApi from '../../utils/MoviesApi';
function App() {

  /*переход по страницам*/
  const navigate = useNavigate()

  const navigateForPage = useCallback((path) => {
    navigate(path, { replace: true })
  }, [navigate])

  const [loggenIn, setloggenIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', email: '' })
  const handleLogin = () => {
    setloggenIn(true);
  }

  /*попапы*/
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  /* const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);*/
  const [isSuccessRegPopupOpen, setIsSuccessRegPopupOpen] = useState(false);
  const [isErrorsRegPopupOpen, setIsErrorRegPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const hendlePopupOpen = () => {
    setIsPopupOpen(true)
  }
  const hendlePopupClose = () => {
    setIsPopupOpen(false)
  }
  /*const hendleDeleteMoviesPopupOpen = () => {
    setIsDeleteMoviesPopupOpen(true)
  }
  const hendleDeleteMoviesPopupClose = () => {
    setIsDeleteMoviesPopupOpen(false)
  }*/
  const hendleSuccessRegPopupClose = () => {
    setIsSuccessRegPopupOpen(false)
    navigateForPage('/signin')
  }
  const hendleErrorRegPopupClose = () => {
    setIsErrorRegPopupOpen(false)
  }

  useEffect(() => {
    beatFilmApi.getMovies()
      .then((movies) => {
        if (localStorage.getItem('beatFilmMap') === null) {
          movies.forEach(m => m.isSaved = false)
          localStorage.setItem('beatFilmMap', JSON.stringify(movies))
        }
        /*localStorage.removeItem('beatFilmMap')*/
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const [mainSavedMap, setMainSavedMap] = useState([])

  useEffect(() => {
    mainApi.getMovies()
      .then((movies) => {
        setMainSavedMap(movies.data)

      })
      .catch((e) => {
        console.log(e)
      })
  }, [navigate])

  let location = useLocation();
  /*проверка токена*/
  const checkToken = useCallback(() => {

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      getCurrentUser(token)
        .then((res) => {
          if (res) {
            handleLogin();
            if (location.pathname === '/signup' || location.pathname === '/signin') {
              navigateForPage('/movies');
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [navigateForPage])

  useEffect(() => {
    checkToken();
  }, [checkToken])



  /*регистрация*/
  function registerUser(name, email, password) {
    register(name, email, password)
      .then((res) => {
        if (res.status === 429) {
          setErrorMessage(TOO_MANY_REQUESTS)
          setIsErrorRegPopupOpen(true)
        }
        else if (res.status <= 300) {
          return res.json()
            .then((res) => {
              setSuccessMessage(SUCCESS_REGISTRATION)
              setIsSuccessRegPopupOpen(true)
            })
        }
        else {
          return res.json()
        }
      })
      .then((res) => {
        setErrorMessage(res.message)
        setIsErrorRegPopupOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*авторизация*/
  function loginUser(email, password) {
    authorize(email, password)
      .then((res) => {
        if (res.status === 429) {
          setErrorMessage(TOO_MANY_REQUESTS)
          setIsErrorRegPopupOpen(true)
        }
        else if (res.status <= 300) {
          return res.json()
            .then((data) => {
              if (data.token) {
                localStorage.setItem("token", data.token);
                setloggenIn(true);
                navigateForPage('/movies')
              }
            })
        }
        else return res.json()
          .then((res) => {
            setErrorMessage(res.message)
            setIsErrorRegPopupOpen(true)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*уcтановка текущего пользователя*/
  const setUser = useCallback(() => {
    mainApi
      .getUser()
      .then((user) => {
        setCurrentUser({ _id: user.data._id, name: user.data.name, email: user.data.email })
      })
      .catch((e) => {
        setloggenIn(false);
        navigateForPage("/signin");
      })
  }, [currentUser])

  useEffect(() => {
    if (loggenIn) {
      setUser()
    }
  }, [loggenIn]);

  /*изменение данных пользователя*/
  function editUser({ item }) {
    console.log({ item })
    mainApi.editUser({ item: item })
      .then((user) => {
        if (user) {
          setCurrentUser({ _id: user.data._id, name: user.data.name, email: user.data.email })
          setSuccessMessage(SUCCESS_EDIT_USER)
          setIsSuccessRegPopupOpen(true)
        }
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsErrorRegPopupOpen(errorMessage)
        console.log(err)
      })
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <NavTabPopup
          isPopupOpen={isPopupOpen}
          hendlePopupClose={hendlePopupClose}
        />
        {/*<DeleteMoviesPopup
          isPopupOpen={isDeleteMoviesPopupOpen}
          hendlePopupClose={hendleDeleteMoviesPopupClose}
          heandleDeleteMovies={heandleDeleteMovies}
  />*/}
        <SuccessRegPopup
          isPopupOpen={isSuccessRegPopupOpen}
          hendlePopupClose={hendleSuccessRegPopupClose}
          successMessage={successMessage}
        />
        <ErrorRegPopup
          isPopupOpen={isErrorsRegPopupOpen}
          hendlePopupClose={hendleErrorRegPopupClose}
          errorMessage={errorMessage} />
        <Header
          hendlePopupOpen={hendlePopupOpen}

        />
        <Routes>
          <Route path="/" element={<Main
          />} />
          { /* <Route path="/movies" element={<ProtectedRoute loggenIn={loggenIn} > <Movies />
                      </ProtectedRoute>}/>*/}
          <Route path="/movies" element={<ProtectedRouteElement element={Movies}
            loggenIn={loggenIn}
            mainSavedMap={mainSavedMap}
          />} />
          {/* <Route path="/saved-movies" element={<ProtectedRoute loggenIn={loggenIn} > <SavedMovies/>
                      </ProtectedRoute>}/>*/}
          {/*<Route path="/saved-movies" element={<SavedMovies />} />*/}
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggenIn={loggenIn}
            navigateForPage={navigateForPage}
            mainSavedMap={mainSavedMap}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile}
            loggenIn={loggenIn}
            navigateForPage={navigateForPage} />} />

          {/*<Route path="/profile" element={loggenIn ? <Profile
                      navigateForPage={navigateForPage}
                    /> : <Navigate to='/signup' replace />} />*/}
          <Route path="/editprofile" element={<ProtectedRouteElement
            element={EditProfile}
            loggenIn={loggenIn}
            editUser={editUser}
          />} />

          {/*<Route path="/editprofile" element={loggenIn ? <EditProfile
                      editUser={editUser} /> : <Navigate to='/signin' replace />} />*/}
          <Route path="/signin" element={<Login
            loginUser={loginUser}
          />} />
          <Route path="/signup" element={<Register
            registerUser={registerUser}
          />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
