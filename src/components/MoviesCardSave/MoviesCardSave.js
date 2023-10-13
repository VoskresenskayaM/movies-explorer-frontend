import './MoviesCardSave.css';
import { useEffect, useState } from 'react';

function MoviesCardSave({ handleSave }) {

    const [isClick, setIsClick] = useState(false)
    useEffect(() => {
        if (isClick)
        handleSave()
    }, [isClick])

    return (
        <button className='moviesCardSave' onClick={()=>setIsClick(true)}>
            <p className='moviesCardSave__value'>Сохранить</p>
        </button>
    )
}

export default MoviesCardSave;
