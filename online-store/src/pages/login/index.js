import React, { useCallback, useContext, useRef, useState } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'

import { logInUser } from '../../services/user'
import UserContext from '../../Context'

const LoginPage = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const history = useHistory()
    const ref = useRef(null)
    const { setUser } = useContext(UserContext)

    //TODO: Create separate component for the input fields and use it both on the Login and Register pages
    // Decide whether the same styling will be used across the site and if so, just change the existing Input
    // component

    const loginNewUser = useCallback(async (event) => {
        event.preventDefault()

        const loginResult = await logInUser(email, password)
        if (loginResult.error) {
            ref.current.innerText = loginResult.error
            return
        }

        setUser(loginResult)
        history.push('/')
    })

    return (
        <div>
            <form className={styles['login-form']} onSubmit={event => loginNewUser(event)}>
                <div className={styles['input-group']}>
                    <input
                        name='email'
                        className={styles.input}
                        type='string'
                        placeholder='Your email address'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['input-group']}>
                    <input
                        name='password'
                        className={styles.input}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.error} ref={ref}></div>
                <button type='submit' className={styles['submit-btn']}>Log In</button>
            </form>
        </div>
    )
}

export default LoginPage