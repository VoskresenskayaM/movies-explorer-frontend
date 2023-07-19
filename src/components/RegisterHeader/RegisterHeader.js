import React from 'react';
import Logo from '../Logo/Logo';
import './RegisterHeader.css';

function RegisterHeader({ children }) {
    return (
        <header className='registerHeader'>
            <Logo />
            <h1 className='registerHeader__title'>{children}</h1>
        </header>
    )
}

export default RegisterHeader;