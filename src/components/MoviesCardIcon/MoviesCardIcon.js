import './MoviesCardIcon.css';
import save from '../../images/icon.svg';

function MoviesCardIcon() {
    return (
        <div className='moviesCardIcon'>
            <img src={save} alt='галочка' />
        </div>
    )
}

export default MoviesCardIcon;