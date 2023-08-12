import './MainHeader.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import MoviesHeader from '../MoviesHeader/MoviesHeader'

function MainHeader({ loggenIn, hendlePopupOpen}) {
    return (<>
        {!loggenIn ?
            <header className='header'>
                <div className='header__conainer'>
                    <Logo />
                    <div className='header__block'>
                        <Link to="/signup" className='header__reg-button'>Регистрация</Link>
                        <Link to="/signin" className='header__log-button'>Войти</Link>
                    </div>
                </div>
            </header> :
            < MoviesHeader
            hendlePopupOpen={hendlePopupOpen} />}</>
    )
}

export default MainHeader
