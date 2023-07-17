import React from 'react';
import './MainSubtitle.css';

function MainSubtitle({ text }) {
    return (
        <div className='mainSubtitle'>
            <p className='mainSubtitle__text'>{text}</p>
        </div>
    )
}

export default MainSubtitle;
