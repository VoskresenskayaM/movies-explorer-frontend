import './Login.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';
import React, { useEffect } from 'react';
import { useFormValidate } from '../../hooks/useFormValidate';
import Preloader from '../Preloader/Preloader';

function Login({ loginUser, isLoading, errorMessage, hendleResetErrorMessage }) {

    useEffect(() => {
        hendleResetErrorMessage()
    }, [])

    const formFields = ['email', 'password']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(formValue.email, formValue.password)
    }

    return (
        <main>
            <section className='login'>
                {isLoading ? <>
                    <RegForm
                        children={
                            <>
                                <Input
                                    id='emailId'
                                    lable='Email'
                                    type='email'
                                    name='email'
                                    autoComplete='on'
                                    placeholder=''
                                    error={errors.emailError || ''}
                                    isValidInput={isValidInputs.emailIsValid || ''}
                                    value={formValue.email || ''}
                                    onChange={handleChange}
                                    disabled={!isLoading}
                                />
                                <Input
                                    id='passwordId'
                                    lable='Пароль'
                                    type='password'
                                    name='password'
                                    autoComplete='on'
                                    placeholder=''
                                    error={errors.passwordError || ''}
                                    isValidInput={isValidInputs.passwordIsValid || ''}
                                    value={formValue.password || ''}
                                    onChange={handleChange}
                                    disabled={!isLoading}
                                />
                            </>
                        }
                        buttonValue='Войти'
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid || false}
                        errorMessage={errorMessage}
                    />
                    <RegQuestion
                        question='Еще не зарегистрированны?'
                        link='/signup'
                        buttonValue='Регистрация'
                    /></>
                    : <Preloader />}
            </section>
        </main>
    )
}
export default Login;
