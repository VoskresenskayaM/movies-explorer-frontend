
import { useState, useEffect } from 'react';

export const useFormValidate = (...args) => {

    const [formValue, setFormValue] = useState({})
    const [errors, setErrors] = useState({}
        /*emailError: '',
        passwordError: ''*/
    )
    const [isValidInputs, setIsValidInputs] = useState({
        /*emailIsValid: false,
        passwordIsValid: false*/
    })
    useEffect(() => {
        args.forEach(val => {
            setFormValue({ ...formValue, [val]: '' })
            setErrors({ ...errors, [`${val}Error`]: '' })
            setIsValidInputs({ ...isValidInputs, [`${val}IsValid`]: false })
        })
    }, [])



    /* const formisValidInputsObj = {}
     args.forEach(val => {
         const field = `${val}IsValid`
         formisValidInputsObj.field = false
     })*/



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
        if (Object.values(isValidInputs).every(e => e === true)
            && Object.values(errors).every(e => e === '')
            && Object.values(formValue).every(e => e !== ''))
            setIsFormValid(true)
        else setIsFormValid(false)
    }, [isValidInputs, errors, formValue])


    return { isValidInputs, errors, formValue, handleChange, isFormValid }
}


