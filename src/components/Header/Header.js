import { useLocation } from "react-router-dom";
import RegisterHeader from '../RegisterHeader/RegisterHeader';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';

function Header({ hendlePopupOpen, windowWidth }) {
    let location = useLocation();

    switch (location.pathname) {

        case '/':
            return (
            <header className='header'>
                <div className='header__conainer'>
                    <Logo />
                    <div className='header__block'>
                        <Link to="/signup" className='header__reg-button'>Регистрация</Link>
                        <Link to="/signin" className='header__log-button'>Войти</Link>
                    </div>
                </div>
            </header>)

        case '/movies':
            return (
                <MoviesHeader
                    hendlePopupOpen={hendlePopupOpen}
                    windowWidth={windowWidth} />
            )

        case '/saved-movies':
            return (
                <MoviesHeader
                    hendlePopupOpen={hendlePopupOpen}
                    windowWidth={windowWidth} />
            )

        case '/signin':
            return (<RegisterHeader
                children='Рады видеть!' />)

        case '/signup':
            return (
                <RegisterHeader
                    children='Добро пожаловать!' />
            )

        case '/editprofile':
            return (
                <RegisterHeader
                    children='Редактирование' />
            )

        case '/profile':
            return (
                <MoviesHeader
                    hendlePopupOpen={hendlePopupOpen}
                    windowWidth={windowWidth} />
            )

        default:
            break

    }
}

export default Header;