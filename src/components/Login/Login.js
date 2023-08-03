import './Login.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFormValidate } from '../../hooks/useFormValidate';


function Login({ loginUser }) {

    /*const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: ''
    })

    const [isValidInputs, setIsValidInputs] = useState({
        emailIsValid: false,
        passwordIsValid: false
    })

    const [isFormValid, setIsFormValid] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!e.target.validity.valid) {
            setErrors({ ...errors, [`${name}Error`]: e.target.validationMessage })
            setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
        }
        else {
            setErrors({ ...errors, [`${name}Error`]: '' })
            setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
        }
        setFormValue({
            ...formValue,
            [name]: value
        });

    }

   useEffect(() => {

        if (Object.values(isValidInputs).every(e => e===true)
        &&Object.values(errors).every(e => e==='')
        &&Object.values(formValue).every(e => e!==''))
        setIsFormValid(true)
        else setIsFormValid(false)
    }, [isValidInputs, errors, formValue])*/

    const formFields = ['email', 'password']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)
   
    const handleSubmit = (e) => {
        e.preventDefault();
    
        loginUser(formValue.email, formValue.password)
    }

    return (
        <main>
            <section className='login'>
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
                                error={errors.emailError||''}
                                isValidInput={isValidInputs.emailIsValid||''}
                                value={formValue.email ||''}
                                onChange={handleChange}
                            />
                            <Input
                                id='passwordId'
                                lable='Пароль'
                                type='password'
                                name='password'
                                autoComplete='on'
                                placeholder=''
                                error={errors.passwordError||''}
                                isValidInput={isValidInputs.passwordIsValid||''}
                                value={formValue.password ||''}
                                onChange={handleChange}
                               
                            />
                        </>
                    }
                    buttonValue='Войти'
                    handleSubmit={handleSubmit}
                    isFormValid={isFormValid||false} />
                <RegQuestion
                    question='Еще не зарегистрированны?'
                    link='/signup'
                    buttonValue='Регистрация'
                />
            </section>
        </main>
    )
}
export default Login;
