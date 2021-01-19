import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import WindowContainer from '../windowContainer'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../services/user'
import UserContext from '../../UserContext'
import { Link } from 'react-router-dom'
import SectionTitle from '../sectionTitle'
import SubmitButton from '../submitButton'
import TextInput from '../inputFields/textInput'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../validationErrorMessage'

const RegisterWindow = ({ hideWindow, loginWindowPopup }) => {
    const [validationConstants, setValidationConstants] = useState(null)
    const { register, errors, handleSubmit, setError } = useForm()
    const { setNewUser } = useContext(UserContext)

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

    const registerNewUser = async (data) => {
        const registerResult = await registerUser(data)

        if (registerResult.uniqueRestriction) {
            setError(registerResult.uniqueRestriction, {
                type: 'string',
                message: registerResult.error
            })

            return
        } else if (!registerResult.error) {
            setNewUser(registerResult)
            hideWindow()
        }
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <form className={styles['register-form']} onSubmit={handleSubmit(registerNewUser)}>
                <SectionTitle title='QUICK Secure SIGN UP' />
                <div className={styles['input-group']}>
                    <TextInput
                        name='email'
                        type='email'
                        placeholder='Your email address'
                        reference={register(validationConstants.email)}
                    />
                    {errors.email && <ValidationErrorMessage message={errors.email.message} />}
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        name='firstName'
                        type='text'
                        placeholder='First name'
                        reference={register(validationConstants.firstName)}
                    />
                    { errors.firstName && 
                        <ValidationErrorMessage message={errors.firstName.message} />
                    }
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        name='lastName'
                        type='text'
                        placeholder='Last name'
                        reference={register(validationConstants.lastName)}
                    />
                    { errors.lastName && 
                        <ValidationErrorMessage message={errors.lastName.message} />
                    }
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        name='password'
                        type='password'
                        placeholder='Password'
                        reference={register(validationConstants.password)}
                    />
                    {errors.password && <ValidationErrorMessage message={errors.password.message} />}
                </div>
                <div
                    className={styles['login-btn']}
                    onClick={loginWindowPopup}
                >
                    Continue with login
                </div>
                <div className={styles.container}>
                    <p className={styles.paragraph}>I wish to receive sale and other information relating to Find you</p>
                    <label className={styles['label-checkbox']}>
                        <input
                            className={styles['checkbox-input']}
                            type="checkbox"
                            name='interest'
                        // ref={register} : TODO : comment was added to stop send the result of the checkbox
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <p className={styles['paragraph-two']}>Find you would like to keep you up to date with news of products and services including store events, offers, promotions, and Sale information. Find you may use your contact details to get in touch by email, telephone, SMS or post. You can opt out at any time by amending your preferences in My Account. Your personal information will not be shared with other companies for their marketing purposes. To find out more, see our Privacy and Cookie Policy.</p>
                <div className={styles['third-container']}>
                    <p className={styles['paragraph-three']}>By clicking Register you agree to the Find You <Link>Terms and Conditions</Link> and <Link>Privacy&Cookie Policy</Link></p>
                    <SubmitButton text='Register' />
                </div>
            </form>
        </WindowContainer>
    )
}

export default RegisterWindow