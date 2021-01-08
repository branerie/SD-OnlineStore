import React, { useContext, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from './index.module.css'

import Footer from '../../components/footer'
import HeaderHome from '../../components/headerHome'
import TextInput from '../../components/inputFields/textInput'
import SectionTitle from '../../components/sectionTitle'
import SubmitButton from '../../components/submitButton'
import { resetUserPassword } from '../../services/user'
import UserContext from '../../Context'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`)

const PasswordResetPage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSent, setIsSent] = useState(false)
    const { resetToken } = useParams()
    const { register, errors, handleSubmit, setError } = useForm()
    const { setUser } = useContext(UserContext)

    const handleFormSubmit = async ({ password }) => {
        const result = await resetUserPassword(password, resetToken)

        if(result.error) {
            //TODO: handle errors
            return
        }

        setUser({ id: result.id, isAdmin: result.isAdmin, favorites: result.favorites })
        setIsSent(true)
    }

    if (isSent) {
        return <Redirect to='/' />
    }

    return (
        <>
            <HeaderHome />
            <SectionTitle title='RESET YOUR PASSWORD' />
            <form className={styles.container} onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={styles['inner-container']}>
                    <TextInput
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        reference={register({
                            pattern: {
                                value: PASSWORD_PATTERN,
                                message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character`
                            },
                            required: {
                                value: true,
                                message: 'Password is required'
                            }
                        })}
                    />
                    {errors.password && (<div className={styles.error}>{errors.password.message}</div>)}
                    <TextInput
                        name='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        ref={register({
                            validate: value => value === password
                        })}
                    />
                    <input
                        type='hidden'
                        name='match'
                        value={password === confirmPassword}
                        ref={register({
                            validate: value => value === 'true'
                        })}
                    />
                    {errors.match && (<div className={styles.error}>Passwords must match</div>)}
                    <SubmitButton text='Submit'style={{ marginTop: '1rem' }} />
                </div>
            </form>
            <Footer />
        </>
    )
}

export default PasswordResetPage