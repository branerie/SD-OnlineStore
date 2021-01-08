import React, { useContext } from 'react'
import styles from './index.module.css'
import WindowContainer from '../windowContainer'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../services/user'
import UserContext from '../../Context'
import { Link } from 'react-router-dom'
import SectionTitle from '../sectionTitle'
import SubmitButton from '../submitButton'

const EMAIL_MAX_LENGTH = 80
const NAME_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 30
const PASSWORD_PATTERN = new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`)
// const NAME_PATTERN = new RegExp(/^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$/)
// const EMAIL_PATTERN = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

const RegisterWindow = ({hideWindow}) => {
    const { register, errors, handleSubmit, setError } = useForm()
    const { setUser } = useContext(UserContext)

    //TODO: Move errors so that they are accessible by both front end and back end
    // and not copy-pasted

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
            hideWindow()
        }

    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <form className={styles['register-form']} onSubmit={handleSubmit(registerNewUser)}>
            <SectionTitle title='QUICK Secure SIGN UP' />
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