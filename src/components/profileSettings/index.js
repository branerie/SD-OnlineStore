import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import TextInput from '../inputFields/textInput'
import PageSecondaryTitle from '../pageSecondaryTitle'
import SubmitButton from '../submitButton'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../validationErrorMessage'
import { changePassword, changeDetails } from '../../services/user'

const ProfileSettings = () => {
    const { user, setNewUser } = useContext(UserContext)
    const [name, setName] = useState({ firstName: user.firstName, lastName: user.lastName })
    const [password, setPassword] = useState({ current: '', new: '', confirmNew: '' })
    const [validationConstants, setValidationConstants] = useState(null)
    const { 
        register: registerName,
        errors: errorsName,
        clearErrors: clearErrorsName, 
        handleSubmit: handleSubmitName, 
        setError: setErrorName
    } = useForm()

    const { 
        register: registerPass,
        errors: errorsPass,
        clearErrors: clearErrorsPass, 
        handleSubmit: handleSubmitPass, 
        setError: setErrorPass
    } = useForm()

    const getUserValidationConstants = useCallback(async () => {
        const userConstants = await getValidationConstants('user')
        setValidationConstants(userConstants)
    }, [setValidationConstants])

    useEffect(() => {
        getUserValidationConstants()
    }, [getUserValidationConstants])

    if (!validationConstants) {
        return null
    }

    const updateUserData = async (data) => {
        const result = await changeDetails(name.firstName, name.lastName)

        if (result.error) {
            setErrorName('internalName', {
                type: 'string',
                message: 'Something went wrong when trying to update your details'
            })

            return setTimeout(() => clearErrorsName('internalName'), 5000)
        }

        setNewUser({ ...user, firstName: name.firstName, lastName: name.lastName })
    }

    const updateUserPassword = async (data) => {
        const result = await changePassword(password.current, password.new)

        if (result.error) {
            setErrorPass('internalPassword', {
                type: 'string',
                message: result.error
            })

            return setTimeout(() => clearErrorsPass('internalPassword'), 5000)
        }

        setPassword({ current: '', new: '', confirmNew: '' })
    }

    return (
        <div className={styles.container}>
            <PageSecondaryTitle title='personal data' style={{ marginTop: '0', marginBottom: '10px' }} />
            <form className={styles.form} onSubmit={handleSubmitName(updateUserData)}>
                <TextInput value={user.email} placeholder='Email' disabled={true} />
                <TextInput
                    name='firstName'
                    value={name.firstName}
                    onChange={e => setName({ ...name, firstName: e.target.value })}
                    placeholder='First name'
                    reference={registerName(validationConstants.firstName)}
                />
                <TextInput
                    name='lastName'
                    value={name.lastName}
                    onChange={e => setName({ ...name, lastName: e.target.value })}
                    placeholder='Last name'
                    reference={registerName(validationConstants.lastName)}
                />

                {(errorsName.firstName || errorsName.lastName) && 
                    <ValidationErrorMessage 
                        message={(errorsName.firstName ? errorsName.firstName : errorsName.lastName).message}
                    />
                }
                {errorsName.internalName && <ValidationErrorMessage message={errorsName.internalName.message} />}

                <div className={styles['submit-wrapper']}>
                    <SubmitButton
                        text='Save Changes'
                        disabled={name.firstName === user.firstName && name.lastName === user.lastName}
                    />
                </div>
            </form>

            <PageSecondaryTitle title='change your password' />
            <form className={styles.form} onSubmit={handleSubmitPass(updateUserPassword)}>
                <div className={styles.password}>
                    <TextInput
                        name='password'
                        type='password'
                        value={password.current}
                        onChange={e => setPassword({ ...password, current: e.target.value })}
                        placeholder='Current password'
                        reference={registerPass(validationConstants.password)}
                    />
                </div>
                <div className={styles['password-new']}>
                    <TextInput
                        name='newPassword'
                        type='password'
                        value={password.new}
                        onChange={e => setPassword({ ...password, new: e.target.value })}
                        placeholder='New password'
                        reference={registerPass(validationConstants.password)}
                    />
                    <TextInput
                        type='password'
                        value={password.confirmNew}
                        onChange={e => setPassword({ ...password, confirmNew: e.target.value })}
                        placeholder='Confirm password'
                    />
                </div>

                { (errorsPass.password || errorsPass.newPassword) && 
                    <ValidationErrorMessage 
                        message={(errorsPass.password ? errorsPass.password: errorsPass.newPassword).message} 
                    />
                }

                {errorsPass.internalPassword && <ValidationErrorMessage message={errorsPass.internalPassword.message} />}

                <div className={styles['submit-wrapper']}>
                    <SubmitButton
                        text='Change Password'
                        disabled={!password.current || !password.new || password.new !== password.confirmNew}
                    />
                </div>
            </form>
        </div>
    )
}

export default ProfileSettings