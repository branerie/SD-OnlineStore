import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import styles from './index.module.css'

import Footer from '../../components/footer'
import HeaderHome from '../../components/headerHome'
import TextInput from '../../components/inputFields/textInput'
import SectionTitle from '../../components/sectionTitle'
import SubmitButton from '../../components/submitButton'
import { resetUserPassword } from '../../services/user'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../../components/validationErrorMessage'

const PasswordResetPage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationConstants, setValidationConstants] = useState(null)
    const [isSent, setIsSent] = useState(false)
    const { resetToken } = useParams()
    const { register, errors, handleSubmit } = useForm()
    const { setNewUser } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)

    const getProductValidationConstants = useCallback(async () => {
        const constants = await getValidationConstants('user')
        setValidationConstants(constants)
    }, [setValidationConstants])

    useEffect(() => {
        getProductValidationConstants()
    }, [getProductValidationConstants])    

    const handleFormSubmit = async ({ password }) => {
        const result = await resetUserPassword(password, resetToken)

        if (result.error) {
            addMessage(
                'Password Reset Confirm',
                'Something went wrong when trying to reset your password. Please be patient as we try to sort out the issue.'
            )

            return
        }

        setNewUser(result)
        setIsSent(true)
    }

    if (!validationConstants) {
        return null
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
                        reference={register(validationConstants.password)}
                    />
                    {errors.password && (<ValidationErrorMessage message={errors.password.message} />)}
                    <TextInput
                        name='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        ref={register({ validate: value => value === password })}
                    />
                    <input
                        type='hidden'
                        name='match'
                        value={password === confirmPassword}
                        ref={register({ validate: value => value === 'true' })}
                    />
                    {errors.match && (<ValidationErrorMessage message='Passwords must match' />)}
                    <SubmitButton text='Submit'style={{ marginTop: '1rem' }} />
                </div>
            </form>
            <Footer />
        </>
    )
}

export default PasswordResetPage