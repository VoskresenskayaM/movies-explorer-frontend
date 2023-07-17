import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Profile({ user }) {
    return (
        <div className='profile'>
            <h1 className='profile__title'>Привет, {user.name}!</h1>
            <div className='profile__info-block'>
                <div className='profile__info-block-elems  profile__info-block-elems-border'>
                    <p className='profile__info-block-elem'>Имя</p>
                    <p className='profile__info-block-elem'>{user.name}</p>
                </div>
                <div className='profile__info-block-elems'>
                    <p className='profile__info-block-elem'>E-mail</p>
                    <p className='profile__info-block-elem'>{user.email}</p>
                </div>
            </div>
            <div className='profile__link-block'>
                <Link to="/editprofile" className='profile__edit'>Редактировать</Link >
                <Link to="/" className='profile__exit'>Выйти из аккаунта</Link >
            </div>
        </div>
    )
}

export default Profile;