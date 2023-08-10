import './Profile.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import { useFormValidate } from '../../hooks/useFormValidate'

function Profile({ navigateForPage, handleNotLogin, editUser, heandleRemoveCurrentUser, isLoading }) {

    const user = useContext(CurrentUserContext);
    const formFields = ['name', 'email']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

    const [isFormValidProfile, setIsValidProfile] = useState(false)

    useEffect(() => {
        if (formValue.email === '' || formValue.name === '') {
            setIsValidProfile(false)
        }
        else if (formValue.name === user.name || formValue.email === user.email) {
            setIsValidProfile(false)
        }
        else if (formValue.name !== user.name && formValue.email !== user.email && isFormValid) {
            setIsValidProfile(true)
        }
    }, [formValue.name, formValue.email, isFormValid])

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedMovie');
        localStorage.removeItem('selectedShortMovie');
        localStorage.removeItem('selectedMoviesMap');
        handleNotLogin();
        heandleRemoveCurrentUser();
        navigateForPage('/signin');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editUser({ item: formValue })
    }

    const profileButton = `profile__form-button  ${!isFormValidProfile ? 'profile__form-button_inactive' : ''}`;

    const profileInputErrorName = isValidInputs.nameIsVAlid ? 'profile__form-input-error' :
        'profile__form-input-error profile__form-input-error_active';
    const profileInputErrorEmail = isValidInputs.emailIsVAlid ? 'profile__form-input-error' :
        'profile__form-input-error profile__form-input-error_active';

    return (
        <main>
            <section className='profile'>
                <h1 className='profile__title'>Привет, {user.name}!</h1>
                <form onSubmit={handleSubmit} className='profile__form' noValidate>
                    <div className='profile__input-error-block profile__input-error-block-line '>
                        <div className='profile__input-block profile__input-block-line '>
                            <p className='profile__input-name'>Имя</p>
                            <input
                                className='profile__form-input'
                                type='text'
                                name='name'
                                value={formValue.name || user.name}
                                required
                                autoComplete="off"
                                onChange={handleChange}
                                disabled={!isLoading} />
                        </div>
                        <span className={profileInputErrorName}>{errors.nameError}</span>
                    </div>
                    <div className='profile__input-error-block'>
                        <div className='profile__input-block'>
                            <p className='profile__input-name'>E-mail</p>
                            <input
                                className='profile__form-input'
                                type='email'
                                name='email'
                                value={formValue.email || user.email}
                                required
                                autoComplete="off"
                                onChange={handleChange}
                                disabled={!isLoading} />
                        </div>
                        <span className={profileInputErrorEmail}>{errors.emailError}</span>
                    </div>
                    <button type='submit' className={profileButton} disabled={!isFormValidProfile}>Редактировать</button >
                </form>
                <div className='profile__link-block'>
                    <Link to="/" className='profile__exit' onClick={signOut}>Выйти из аккаунта</Link >
                </div>
            </section>
        </main>
    )
}

export default Profile;
