import React from 'react';
import './EditProfile.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import { useFormValidate } from '../../hooks/useFormValidate'

function EditProfile({ editUser }) {

    const formFields = ['name', 'email']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)
 
    const handleSubmit = (e) => {
        e.preventDefault();
        editUser({item: formValue})
    }

    return (
        <div className='editprofile'>
            <RegForm
                children={
                    <>
                        <Input
                            id='nameId'
                            lable='Имя'
                            type='text'
                            name='name'
                            autoComplete='on'
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
                            error={errors.emailError||''}
                            isValidInput={isValidInputs.emailIsValid||''}
                            value={formValue.email||''}
                            onChange={handleChange}
                        />
                    </>
                }
                handleSubmit={handleSubmit}
                buttonValue='Редактировать'
                isFormValid={isFormValid} />
        </div>
    )
}
export default EditProfile;
