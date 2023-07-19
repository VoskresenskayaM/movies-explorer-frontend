import './MoviesCardIcon.css';
import save from '../../images/icon.svg';

function MoviesCardIcon() {
    return (
        <button className='moviesCardIcon'>
            <img src={save} alt='галочка' />
        </button>
    )
}

export default MoviesCardIcon;