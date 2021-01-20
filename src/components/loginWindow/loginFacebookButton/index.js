import React, { useEffect, useContext } from 'react'
import styles from './index.module.css'
import commonStyles from '../index.module.css'
import { loadFacebookSDK } from '../../../utils/user'
import { loginWithFacebook } from '../../../services/user'
import ErrorContext from '../../../ErrorContext'

const FACEBOOK_LOGIN_ERROR = 'Unfortunately, there was an issue with Facebook authentication. Please try again later, or use another authentication method.'

const FacebookLogin = ({ setUserState, text = 'facebook' }) => {
    const { addMessage } = useContext(ErrorContext)

    useEffect(() => {
        const unloadFacebookSDK = loadFacebookSDK()
        return unloadFacebookSDK
    }, [])

    const handleFacebookResponse = (response) => {
        if (response.status === 'connected') {
            const signedRequest = response.authResponse.signedRequest
            window.FB.api('/me?fields=id,email,name', async (userResponse) => {
                const { id, email, name } = userResponse
                if (!email) {
                    //TODO: Handle case when user has refused to provide email
                }

                const loginResult = await loginWithFacebook(id, email, name, signedRequest)
                if (loginResult.error) {
                    addMessage('Facebook Login', FACEBOOK_LOGIN_ERROR)
                }

                setUserState(loginResult)
            })

            return true
        } else {
            return false
        }
    }

    const facebookSignIn = () => {
        if (!window.FB) {
            addMessage(
                'Facebook SDK', 
                'Facebook tools have been blocked by your browser\'s settings. Please allow Facebook or choose a different login method.'
            )

            return
        }

        window.FB.getLoginStatus(async (response) => {
            let isConnected = handleFacebookResponse(response)

            if (!isConnected) {
                window.FB.login(loginResponse => {
                    isConnected = handleFacebookResponse(loginResponse)

                    if (!isConnected) {
                        addMessage('Facebook Connection', FACEBOOK_LOGIN_ERROR)
                    }
                }, { scope: 'email' })
            }
        })
    }

    return (
        <button
            type="button"
            className={[styles['btn-facebook'], commonStyles.btn].join(' ')}
            onClick={facebookSignIn}
        >
            {text}
        </button>
    )
}

export default FacebookLogin