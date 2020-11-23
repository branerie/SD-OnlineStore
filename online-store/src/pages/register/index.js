import React from 'react'
import styles from './index.module.css'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { registerUser } from '../../services/user'

const EMAIL_MAX_LENGTH = 20
const NAME_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`);

const RegisterPage = () => {
    const history = useHistory()
    const { register, errors, handleSubmit, setError } = useForm()

    const registerNewUser = async (data) => {
        const registerResult = await registerUser(data)

        if (registerResult.uniqueRestriction) {
            setError(registerResult.uniqueRestriction, {
                type: 'string',
                message: registerResult.error
            })

            return
        }

        history.push('/')
    }

    return (
        <div>
            <form className={styles.registerForm} onSubmit={handleSubmit(registerNewUser)}>
                <label for='fname'>First name:</label>
                <input
                    name='firstName'
                    id='fname'
                    type='text'
                    ref={register({
                        required: {
                            value: true,
                            message: 'Your input is required'
                        },
                        pattern: {
                            value: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                            message: 'Name can only contain Latin letters and dash (-).'
                        },
                        maxLength: {
                            value: NAME_MAX_LENGTH,
                            message: `Name must be shorter than ${NAME_MAX_LENGTH} symbols.`
                        }
                    })}
                />
                {errors.firstName && (<div className={styles.error}>{errors.firstName.message}</div>)}
                <label for='lname'>Last name:</label>
                <input
                    name='lastName'
                    id='lname'
                    type='text'
                    ref={register({
                        pattern: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                        required: true,
                        maxLength: NAME_MAX_LENGTH
                    })}
                />
                {errors.lastName?.type === 'required' && (
                    <div className={styles.error}>Your input is required</div>
                )}
                {errors.lastName?.type === 'pattern' && (
                    <div className={styles.error}>Name can only contain Latin letters and dash (-).</div>
                )}
                {errors.lastName?.type === 'maxLength' && (
                    <div className={styles.error}>Name must be shorter than {NAME_MAX_LENGTH} symbols.</div>
                )}
                <label for='pass'>Password:</label>
                <input
                    name='password'
                    id='pass'
                    type='password'
                    ref={register({
                        pattern: {
                            value: PASSWORD_PATTERN,
                            message: `Password must be between ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`
                        },
                        required: {
                            value: true,
                            message: 'Your input is required'
                        },
                        minLength: {
                            value: PASSWORD_MIN_LENGTH,
                            message: `Minimun length of password is ${PASSWORD_MIN_LENGTH} symbols.`
                        },
                        maxLength: {
                            value: PASSWORD_MAX_LENGTH,
                            message: `Maximum length of password is ${PASSWORD_MAX_LENGTH} symbols.`
                        }
                    })}
                />
                {errors.password && (<div className={styles.error}>{errors.password.message}</div>)}
                <label for='emails'>Your email address:</label>
                <input
                    name='email'
                    id='emails'
                    type='string'
                    ref={register({
                        required: {
                            value: true,
                            message: 'Your input is required'
                        },
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Invalid email'
                        },
                        maxLength: {
                            value: EMAIL_MAX_LENGTH,
                            message: `Email must be shorter than ${EMAIL_MAX_LENGTH} symbols.`
                        }
                    })}
                />
                {errors.email && (<div className={styles.error}>{errors.email.message}</div>)}
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage