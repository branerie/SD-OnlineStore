import React, { useCallback, useContext, useRef, useState } from 'react'
import styles from './index.module.css'

import { logInUser } from '../../services/user'
import UserContext from '../../Context'
import TextInput from '../inputFields/textInput'
import WindowContainer from '../windowContainer'
import FacebookLoginButton from './loginFacebookButton'
import GoogleLoginButton from './loginGoogleButton'

const LoginWindow = ({ hideWindow }) => {
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
                <h3 className={styles.header}>log in</h3>
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
                <button type='submit' className={[styles['btn-submit'], styles.btn].join(' ')}>
                    enter
                </button>
                <h3 className={styles.header}>log in with:</h3>
                <FacebookLoginButton setUserState={setNewUserState} text='facebook' />
                <GoogleLoginButton setUserState={setNewUserState} text='google' />
            </form>
        </WindowContainer>
    )
}

export default LoginWindow