import './EditProfile.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';

function EditProfile({ user }) {

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
                            value={user.name}
                            autoComplete='on'
                            error='какая-то ошибка валидации'
                            isValidInput={true}
                        />
                        <Input
                            id='emailId'
                            lable='Email'
                            type='email'
                            name='email'
                            value={user.email}
                            autoComplete='on'
                            error='какая-то ошибка валидации'
                            isValidInput={true}
                        />
                        <Input
                            id='passwordId'
                            lable='Новый пароль'
                            type='password'
                            name='password'
                            autoComplete='on'
                            error='какая-то ошибка валидации'
                            isValidInput={true}
                        />
                    </>
                }
                buttonValue='Редактировать' />
        </div>
    )
}
export default EditProfile;
