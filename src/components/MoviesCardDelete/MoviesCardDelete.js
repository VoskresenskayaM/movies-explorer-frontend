import './MoviesCardDelete.css';
import del from '../../images/delete.svg';
import { useEffect, useState } from 'react';

function MoviesCardDelete({ hendleDelete }) {
  const [isClick, setIsClick] = useState(false)
    useEffect(()=>{
        if(isClick)
        hendleDelete()
    },[isClick])

    return (
        <button className='moviesCardDelete' onClick={()=>setIsClick(true)}>
            <img src={del} alt='крестик' />
        </button>
    )
}

export default MoviesCardDelete;
