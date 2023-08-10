import './Register.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';
import { useFormValidate } from '../../hooks/useFormValidate'
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

function Register({ registerUser, isLoading, errorMessage, hendleResetErrorMessage }) {

    useEffect(() => {
        hendleResetErrorMessage()
    }, [])

    const formFields = ['name', 'email', 'password']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = formValue;
        registerUser(name, email, password)
    }

    return (
        <main>
            <section className='regiser'>
                {isLoading ?
                    <>
                        <RegForm
                            children={
                                <>
                                    <Input
                                        id='nameId'
                                        lable='Имя'
                                        type='text'
                                        name='name'
                                        autoComplete='on'
                                        placeholder=''
                                        error={errors.nameError || ''}
                                        isValidInput={isValidInputs.nameIsValid || ''}
                                        value={formValue.name || ''}
                                        onChange={handleChange}
                                        disabled={!isLoading}
                                    />
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
                            buttonValue='Зарегистрироваться'
                            handleSubmit={handleSubmit}
                            isFormValid={isFormValid || false}
                            errorMessage={errorMessage} />
                        <RegQuestion
                            question='Уже зарегистрированы?'
                            link='/signin'
                            buttonValue='Войти'
                        />
                    </>
                    : <Preloader />}
            </section>
        </main >
    )
}
export default Register;
