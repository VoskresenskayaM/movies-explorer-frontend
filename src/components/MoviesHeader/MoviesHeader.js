import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './MoviesHeader.css';
import NavTab from '../NavTab/NavTab';
import { useGetWindowWidth } from '../../hooks/useGetWindowWidth';

function MoviesHeader({ hendlePopupOpen }) {

    const windowWidthHeader = useGetWindowWidth()
    console.log(windowWidthHeader)
    if (windowWidthHeader < 1280)
        return (
            <header className="moviesheader">
                <Logo />
                <Burger
                    hendlePopupOpen={hendlePopupOpen}
                />
            </header>)
    else
        return (<header className="moviesheader">
            <Logo />
            <NavTab />
        </header>)
}
export default MoviesHeader;
