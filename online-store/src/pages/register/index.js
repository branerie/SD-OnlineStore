import React, { useContext } from 'react'
import styles from './index.module.css'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { registerUser } from '../../services/user'
import UserContext from '../../Context'

const EMAIL_MAX_LENGTH = 20
const NAME_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`)
const NAME_PATTERN = new RegExp(/^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/)
const EMAIL_PATTERN = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

const RegisterPage = () => {
    const history = useHistory()
    const { register, errors, handleSubmit, setError } = useForm()
    const { setUser } = useContext(UserContext)

    //TODO: Move errors so that they are accessible by both front end and back end
    // and not copy-pasted

    //TODO: Fix bug where user is redirected to home page when the form is invalid

    const registerNewUser = async (data) => {
        const registerResult = await registerUser(data)

        if (registerResult.uniqueRestriction) {
            setError(registerResult.uniqueRestriction, {
                type: 'string',
                message: registerResult.error
            })

            return
        } else if (!registerResult.error) {
            setUser(registerResult)

            history.push('/')
        }

    }

    return (
        <div>
            <form className={styles['register-form']} onSubmit={handleSubmit(registerNewUser)}>
            <div className={styles['input-group']}>
                    <input
                        name='email'
                        id='email'
                        className={styles.input}
                        type='string'
                        placeholder='Your email address'
                        ref={register({
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Invalid email'
                            },
                            maxLength: {
                                value: EMAIL_MAX_LENGTH,
                                message: `Email must be shorter than ${EMAIL_MAX_LENGTH} symbols`
                            }
                        })}
                    />
                    {errors.email && (<div className={styles.error}>{errors.email.message}</div>)}
                </div>
                <div className={styles['input-group']}>
                    <input
                        name='firstName'
                        id='fname'
                        className={styles.input}
                        type='text'
                        placeholder='First name'
                        ref={register({
                            required: {
                                value: true,
                                message: 'First name is required'
                            },
                            pattern: {
                                value: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                                message: 'Name can only contain Latin letters and dash (-)'
                            },
                            maxLength: {
                                value: NAME_MAX_LENGTH,
                                message: `Name must be shorter than ${NAME_MAX_LENGTH} symbols`
                            }
                        })}
                    />
                    {errors.firstName && (<div className={styles.error}>{errors.firstName.message}</div>)}
                </div>
                <div className={styles['input-group']}>
                    <input
                        name='lastName'
                        id='lname'
                        className={styles.input}
                        type='text'
                        placeholder='Last name'
                        ref={register({
                            pattern: /^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/,
                            required: true,
                            maxLength: NAME_MAX_LENGTH
                        })}
                    />
                    {errors.lastName?.type === 'required' && (
                        <div className={styles.error}>Last name is required</div>
                    )}
                    {errors.lastName?.type === 'pattern' && (
                        <div className={styles.error}>Name can only contain Latin letters and dash (-)</div>
                    )}
                    {errors.lastName?.type === 'maxLength' && (
                        <div className={styles.error}>Name must be shorter than {NAME_MAX_LENGTH} symbols</div>
                    )}
                </div>
                <div className={styles['input-group']}>
                    <input
                        name='password'
                        id='pass'
                        className={styles.input}
                        type='password'
                        placeholder='Password'
                        ref={register({
                            pattern: {
                                value: PASSWORD_PATTERN,
                                message: `Password must be between ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character`
                            },
                            required: {
                                value: true,
                                message: 'Password is required'
                            },
                            minLength: {
                                value: PASSWORD_MIN_LENGTH,
                                message: `Minimum length of password is ${PASSWORD_MIN_LENGTH} symbols`
                            },
                            maxLength: {
                                value: PASSWORD_MAX_LENGTH,
                                message: `Maximum length of password is ${PASSWORD_MAX_LENGTH} symbols`
                            }
                        })}
                    />
                    {errors.password && (<div className={styles.error}>{errors.password.message}</div>)}

                </div>
                <button type='submit' className={styles['submit-btn']}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage