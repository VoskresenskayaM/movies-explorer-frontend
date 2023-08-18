import './Profile.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import { VALIDATE_NAME } from '../../utils/Constants';
import SubmitButton from '../SubmitButton/SubmitButton';
import ErrorMessageFromForm from '../ErrorMessageFromForm/ErrorMessageFromForm'
import validator from "validator";

function Profile({ navigateForPage, handleNotLogin, editUser,
    heandleRemoveCurrentUser, isLoading,
    errorMessage, hendleResetErrorMessage }) {
    useEffect(() => {
        hendleResetErrorMessage()
    }, [])

    const user = useContext(CurrentUserContext);

    const [formValue, setFormValue] = useState({
        'name': user.name,
        'email': user.email
    })
    const [errors, setErrors] = useState({
        'nameIsError': '',
        'emailIsError': ''
    }
    )
    const [isValidInputs, setIsValidInputs] = useState({
        'nameIsVaild': true,
        'emailIsValid': true
    })

    useEffect(() => {
        setFormValue({
            name: user.name,
            email: user.email,
        });
    }, [user.name, user.email, setFormValue]);

    const [isFormValid, setIsFormValid] = useState(true)
    const [isFormValidProfile, setIsValidProfile] = useState(false);
    const [isRequest, setIsRequest] = useState(false)

    const validate = (name, value) => {
        switch (name) {
            case "name":
                if (value.length === 0 || value.length === undefined) {
                    setErrors({ ...errors, [`${name}Error`]: "Заполните это поле" });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else if (value.length < 2) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя не может быть меньше 2-х символов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                } else if (value.length >= 30) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя не может быть больше 30-ти символов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })

                } else if (!VALIDATE_NAME.test(value)) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя должно состоять из букв, дефисов или пробелов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else {
                    setErrors({ ...errors, [`${name}Error`]: '' })
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
                }
                break;

            case "email":
                if (value.length === 0 || value.length === undefined) {
                    setErrors({ ...errors, [`${name}Error`]: "Заполните это поле" });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }

                else if (!validator.isEmail(value)) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Некорректный адрес электронной почты",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else {
                    setErrors({ ...errors, [`${name}Error`]: '' })
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
                }
                break;


            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        validate(name, value)
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    useEffect(() => {
        if (Object.values(isValidInputs).every(e => e === true)
            && Object.values(errors).every(e => e === '')
            && Object.values(formValue).every(e => e !== ''))
            setIsFormValid(true)
        else setIsFormValid(false)
    }, [isValidInputs, errors, formValue])

    useEffect(() => {
        if (isFormValidProfile || (isFormValidProfile === false && isFormValid === false))
            setIsRequest(true)
        else setIsRequest(false)
    }, [isFormValid, isFormValidProfile])


    useEffect(() => {
        if (formValue.name === user.name && formValue.email === user.email) {
            setIsValidProfile(false)
        }
        else if (isFormValid === false) {
            setIsValidProfile(false)
        }
        else if (errorMessage !== '') {
            setIsFormValid(false)
        }
        else setIsValidProfile(true)

    }, [formValue.name, formValue.email, isFormValid, isLoading])

    function signOut() {
        localStorage.clear()
        handleNotLogin();
        heandleRemoveCurrentUser();
        navigateForPage('/');
    }

    const handleSubmit = (e) => {
        setIsRequest(true)
        e.preventDefault();
        editUser({ item: formValue })
    }

    const profileButton = `profile__form-button  ${!isFormValidProfile ? 'profile__form-button_inactive' : ''}`;
    const profileInputErrorName = isValidInputs.nameIsVAlid ? 'profile__form-input-error' :
        'profile__form-input-error profile__form-input-error_active';
    const profileInputErrorEmail = isValidInputs.emailIsVAlid ? 'profile__form-input-error' :
        'profile__form-input-error profile__form-input-error_active';
    const profileExit = isRequest ? 'profile__exit  profile__exit_inactiv' :
        'profile__exit ';

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
                                value={formValue.name || ''}
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
                                value={formValue.email || ''}
                                required
                                autoComplete="off"
                                onChange={handleChange}
                                disabled={!isLoading} />
                        </div>
                        <span className={profileInputErrorEmail}>{errors.emailError}</span>
                    </div>

                    {isRequest ?
                        <>
                            <ErrorMessageFromForm
                                errorMessage={errorMessage} />
                            <SubmitButton
                                buttonValue="Сохранить"
                                isFormValid={isFormValidProfile}
                                handleSubmit={handleSubmit}

                            /></>
                        : <button type='submit' className={profileButton} disabled={!isFormValidProfile}>Редактировать</button >}
                </form>
                <div className='profile__link-block'>
                    <Link to="/" className={profileExit} onClick={signOut}>Выйти из аккаунта</Link >
                </div>
            </section>
        </main>
    )
}

export default Profile;
