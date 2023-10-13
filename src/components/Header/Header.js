import { useLocation } from "react-router-dom";
import RegisterHeader from '../RegisterHeader/RegisterHeader';
import MoviesHeader from '../MoviesHeader/MoviesHeader';
import './Header.css';
import MainHeader from '../MainHeader/MainHeader';

function Header({ hendlePopupOpen, loggenIn }) {

    let location = useLocation();

    switch (location.pathname) {
        case '/':
            return (<MainHeader
                loggenIn={loggenIn}
                hendlePopupOpen={hendlePopupOpen} />)
        case '/movies':
            return (
                <MoviesHeader
                    hendlePopupOpen={hendlePopupOpen}
                    loggenIn={loggenIn}  />
            )
        case '/saved-movies':
            return (
                <MoviesHeader
                    hendlePopupOpen={hendlePopupOpen}
                    loggenIn={loggenIn}  />
            )
        case '/signin':
            return (<RegisterHeader
                children='Рады видеть!' />
            )
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
                    loggenIn={loggenIn}  />
            )
        default:
            break
    }
}

export default Header;
