import './Register.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';
import  { useState } from 'react';
import { useFormValidate } from '../../hooks/useFormValidate'
import { toHaveErrorMessage } from '@testing-library/jest-dom/matchers';


function Register({ registerUser }) {

    const formFields = ['name', 'email', 'password']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

    /*const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
      })

      const handleChange = (e) => {
        const {name, value} = e.target;
    
        setFormValue({
          ...formValue,
          [name]: value
        });
      }*/

      const handleSubmit = (e) => {
        e.preventDefault();
          const { name,  email, password } = formValue;
          registerUser(name, email, password)
        }

    return (
            <main>
                <section className='regiser'>
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
                                    error={errors.nameError||''}
                                    isValidInput={isValidInputs.nameIsValid||''}
                                    value={formValue.name||''}
                                    onChange={handleChange}
                                />
                                <Input
                                    id='emailId'
                                    lable='Email'
                                    type='email'
                                    name='email'
                                    autoComplete='on'
                                    placeholder=''
                                    error={errors.emailError||''}
                                    isValidInput={isValidInputs.emailIsValid||''}
                                    value={formValue.email||''}
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
                                    value={formValue.password||''}
                                    onChange={handleChange}
                                />
                            </>
                        }
                        buttonValue='Зарегистрироваться'
                        handleSubmit={handleSubmit}
                        isFormValid={isFormValid||false} />
                    <RegQuestion
                        question='Уже зарегистрированы?'
                        link='/signin'
                        buttonValue='Войти'
                    />
                </section>
            </main>
    )
}
export default Register;
