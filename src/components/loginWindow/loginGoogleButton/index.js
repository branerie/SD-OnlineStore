import React from 'react'
import styles from './index.module.css'
import commonStyles from '../index.module.css'

import { useGoogleLogin } from 'react-google-login'
import { loginWithGoogle } from '../../../services/user'
import { GOOGLE_CLIENT_ID } from '../../../utils/constants'

const LoginGoogle = ({ setUserState, text = 'google' }) => {
    const { signIn: googleSignIn, loaded } = useGoogleLogin({
        onSuccess: async (res) => {
            const loginResult = await loginWithGoogle(res.tokenId, res.profileObj.email)
            if (loginResult.error) {
                //TODO: Handle login failure
                return
            }

            setUserState(loginResult)
        },
        onFailure: (res) => {
            //TODO: Handle login failure
            console.log(res)
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