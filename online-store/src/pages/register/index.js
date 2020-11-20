import React from 'react'
import styles from './index.module.css'
import { useForm } from 'react-hook-form'
import getCookie from '../../utils/cookie'

const EMAIL_MAX_LENGTH = 20
const NAME_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`);

const RegisterPage = () => {
    const { register , errors, handleSubmit } = useForm()

    const registerUser = async(data) => {
        
        await fetch('http://localhost:3001/api/user/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div>
            <form className={styles.registerForm} onSubmit={handleSubmit(registerUser)}>
                <label for='fname'>First name:</label>
                <input
                        name='firstName'
                        id='fname'
                        type = 'text'
                        ref = {register({
                                        required: true,
                                        pattern: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                                        maxLength: NAME_MAX_LENGTH
                                    })}
                />
                    {errors.firstName?.type === 'required' && 'Your input is required'}
                    {errors.firstName?.type === 'pattern' && 'Name can only contain Latin letters and dash (-).'}
                    {errors.firstName?.type === 'maxLength' && `Name must be shorter than ${NAME_MAX_LENGTH} symbols.`}
                <label for='lname'>Last name:</label>
                <input 
                        name='lastName'
                        id='lname'
                        type = 'text'
                        ref = {register({
                                        pattern: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                                        required: true,                                        
                                        maxLength: NAME_MAX_LENGTH
                                    })}
                />
                    {errors.lastName?.type === 'required' && 'Your input is required'}
                    {errors.lastName?.type === 'pattern' && 'Name can only contain Latin letters and dash (-).'}
                    {errors.lastName?.type === 'maxLength' && `Name must be shorter than ${NAME_MAX_LENGTH} symbols.`}
                <label for='pass'>Password:</label>
                <input 
                        name='password'
                        id='pass'
                        type = 'password'
                        ref = {register({
                                        pattern: PASSWORD_PATTERN,
                                        required: true,
                                        minLength:PASSWORD_MIN_LENGTH,
                                        maxLength: PASSWORD_MAX_LENGTH
                                    })}
                />
                    {errors.password?.type === 'required' && 'Your input is required'}
                    {errors.password?.type === 'pattern' && `Password must be between ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`}
                    {errors.password?.type === 'minLength' && `Minimun length of password is ${PASSWORD_MIN_LENGTH} symbols.`}
                    {errors.password?.type === 'maxLength' && `Maximum length of password is ${PASSWORD_MAX_LENGTH} symbols.`}
                <label for='emails'>Your email address:</label>
                <input
                        name='email'
                        id='emails'
                        type='email'
                        ref = {register({
                                        required:true,
                                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        maxLength: EMAIL_MAX_LENGTH
                        })}
                />
                   {errors.email?.type === 'required' && 'Your input is required'}
                   {errors.email?.type === 'pattern' && 'Invalid email'}
                   {errors.email?.type === 'maxLength' && `Email must be shorter than ${EMAIL_MAX_LENGTH} symbols.`}
            <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage