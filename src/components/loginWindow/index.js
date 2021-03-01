import React, { useCallback, useContext, useRef, useState } from 'react'
import styles from './index.module.css'

import { logInUser, setShoppingCart } from '../../services/user'
import UserContext from '../../UserContext'
import TextInput from '../inputFields/textInput'
import WindowContainer from '../windowContainer'
import FacebookLoginButton from './loginFacebookButton'
import GoogleLoginButton from './loginGoogleButton'
import SectionTitle from '../sectionTitle'
import SubmitButton from '../submitButton'
import ClosePopUp from '../closePopUp'

const LoginWindow = ({ hideWindow, registerWindowPopup, passwordResetPopup }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const ref = useRef(null)
    const { user, setNewUser } = useContext(UserContext)

    const setNewUserState = useCallback((userState) => {
        setNewUser(userState)
        hideWindow()
    }, [hideWindow, setNewUser])

    if (user.userId) {
        return null
    }

    const loginNewUser = async (event) => {
        event.preventDefault()

        const loginResult = await logInUser(email, password)
        if (loginResult.error) {
            ref.current.innerText = 'Invalid email or password'
            return
        }

        // if result contains cart, it was set from the guest user's cart
        // (as user cart was empty - if it was not, should not take guest cart)
        // and needs to be updated on back end for user 
        if (loginResult.cart) {
            const cartResult = await setShoppingCart(loginResult.cart)

            if (cartResult.error) {
                ref.current.innerText = 'Could not update user cart'
                return
            }
        }

        setNewUserState(loginResult)
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <ClosePopUp hideWindow={hideWindow} />
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
                <SubmitButton text='enter' disabled={!email || !password} />
                <SectionTitle title='log in with:' />
                {/* <FacebookLoginButton setUserState={setNewUserState} text='facebook' /> */}
                <GoogleLoginButton setUserState={setNewUserState} text='google' />
            </form>
                <SectionTitle title='new customer' />
                <div className={styles['register-link']} onClick={registerWindowPopup}>register now</div>                
        </WindowContainer>
    )
}

export default LoginWindow