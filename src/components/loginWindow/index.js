import React, { useCallback, useContext, useRef, useState } from 'react'
import styles from './index.module.css'

import { logInUser } from '../../services/user'
import UserContext from '../../Context'
import TextInput from '../inputFields/textInput'
import WindowContainer from '../windowContainer'
import FacebookLoginButton from './loginFacebookButton'
import GoogleLoginButton from './loginGoogleButton'
import SectionTitle from '../sectionTitle'
import SubmitButton from '../submitButton'

const LoginWindow = ({ hideWindow, registerWindowPopup, passwordResetPopup }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const ref = useRef(null)
    const { user, setUser } = useContext(UserContext)

    const setNewUserState = useCallback((userState) => {
        setUser(userState)
        hideWindow()
    }, [hideWindow, setUser])

    if (user.id) {
        return null
    }

    const loginNewUser = async (event) => {
        event.preventDefault()

        const loginResult = await logInUser(email, password)
        if (loginResult.error) {
            ref.current.innerText = loginResult.error
            return
        }

        setNewUserState(loginResult)
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <form className={styles['login-form']} onSubmit={event => loginNewUser(event)}>
                <SectionTitle title='log in' />
                <div className={styles['input-group']}>
                    <TextInput
                        type='email'
                        placeholder='Email:'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        type='password'
                        placeholder='Password:'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.error} ref={ref}></div>
                <div
                    className={styles['pass-reset-link']}
                    onClick={passwordResetPopup}
                >
                    Forgot your password?
                </div>
                <SubmitButton text='enter' />
                <SectionTitle title='log in with:' />
                <FacebookLoginButton setUserState={setNewUserState} text='facebook' />
                <GoogleLoginButton setUserState={setNewUserState} text='google' />
            </form>
                <SectionTitle title='new customer' />
                <div className={styles['register-link']} onClick={registerWindowPopup}>register now</div>                
        </WindowContainer>
    )
}

export default LoginWindow