import { useLocation } from 'react-router-dom';
import './Burger.css';
function Burger({ hendlePopupOpen }) {

    const location = useLocation();
    const burgerLine = location.pathname === '/' ? 'burger__line  burger__line_white' : 'burger__line';

    return (
        <div className='burger' onClick={hendlePopupOpen}>
            <div className={burgerLine}></div>
            <div className={burgerLine}></div>
            <div className={burgerLine}></div>
        </div>
    )
}

export default Burger;
