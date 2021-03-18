import React, { useContext } from 'react'
import styles from './index.module.css'
import commonStyles from '../index.module.css'

import { useGoogleLogin } from 'react-google-login'
import { loginWithGoogle } from '../../../services/user'
import { GOOGLE_CLIENT_ID } from '../../../utils/constants'
import ErrorContext from '../../../contexts/ErrorContext'

const LoginGoogle = ({ setUserState, text = 'google' }) => {
    const { addMessage } = useContext(ErrorContext)

    const { signIn: googleSignIn } = useGoogleLogin({
        onSuccess: async (res) => {
            const loginResult = await loginWithGoogle(res.tokenId, res.profileObj.email)
            if (loginResult.error) {
                addMessage('Google Login', 'Failed to login with Google')
                return
            }

            setUserState(loginResult)
        },
        onFailure: (res) => {
            addMessage('Google Login', 'Google authentication failed to load correctly')
        },
        clientId: GOOGLE_CLIENT_ID
    })

    return (
        <button
            type="button"
            className={[styles['btn-google'], commonStyles.btn].join(' ')}
            onClick={googleSignIn}
        >
            {text}
        </button>
    )
}

export default LoginGoogle