import './MoviesCardIcon.css';
import save from '../../images/icon.svg';
import { useEffect, useState } from 'react';
function MoviesCardIcon({ hendleDeleteSavedMovies }) {

    const [isClick, setIsClick] = useState(false)
    useEffect(() => {
        if (isClick)
            hendleDeleteSavedMovies()
    }, [isClick])

    return (
        <button className='moviesCardIcon' onClick={()=>setIsClick(true)}>
            <img src={save} alt='галочка' />
        </button>
    )
}

export default MoviesCardIcon;
