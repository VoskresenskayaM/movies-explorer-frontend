import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import './MoviesHeader.css';
import NavTab from '../NavTab/NavTab';
import { useGetWindowWidth } from '../../hooks/useGetWindowWidth';
import { useLocation } from 'react-router-dom';
import { LAPTOP } from '../../utils/Constants'

function MoviesHeader({ hendlePopupOpen }) {
    const location = useLocation()
    const moviesheader = location.pathname === '/' ? 'moviesheader_blue  moviesheader' : 'moviesheader'

    const windowWidthHeader = useGetWindowWidth()
    if (windowWidthHeader < LAPTOP)
        return (
            <header className={moviesheader}>
                <div className='moviesheader-block'>
                    <Logo />
                    <Burger
                        hendlePopupOpen={hendlePopupOpen}
                    />
                </div>
            </header>)
    else
        return (<header className={moviesheader}>
            <div className='moviesheader-block'>
                <Logo />
                <NavTab
                />
            </div>
        </header>)
}
export default MoviesHeader;
