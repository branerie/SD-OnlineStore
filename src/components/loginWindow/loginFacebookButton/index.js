import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import commonStyles from '../index.module.css'
import { loadFacebookSDK } from '../../../utils/user'
import { loginWithFacebook } from '../../../services/user'
import ErrorContext from '../../../ErrorContext'

const FacebookLogin = ({ setUserState, text = 'facebook' }) => {
    const [fb, setFb] = useState(window.fb)
    const { addMessage } = useContext(ErrorContext)

    useEffect(() => {
        const unloadFacebookSDK = loadFacebookSDK()

        if (!window.FB) {
            // TODO: User's browser is blocking the facebook SDK - display a message
            addMessage(
                'Facebook SDK', 
                'Facebook tools have been blocked by your browser\'s settings. Please allow facebook or choose a different login method.'
            )
            
            return
        }

        setFb(window.FB)
        return unloadFacebookSDK
    }, [])

    

    const handleFacebookResponse = (response) => {
        if (response.status === 'connected') {
            const signedRequest = response.authResponse.signedRequest
            fb.api('/me?fields=id,email,name', async (userResponse) => {
                const { id, email, name } = userResponse
                if (!email) {
                    //TODO: Handle case when user has refused to provide email
                }

                const loginResult = await loginWithFacebook(id, email, name, signedRequest)
                if (loginResult.error) {
                    //TODO: Handle errors
                }

                setUserState(loginResult)
            })

            return true
        } else {
            return false
        }
    }

    const facebookSignIn = () => {
        fb.getLoginStatus(async (response) => {
            let isConnected = handleFacebookResponse(response)

            if (!isConnected) {
                fb.login(loginResponse => {
                    isConnected = handleFacebookResponse(loginResponse)

                    if (!isConnected) {
                        //TODO: Handle case when user could/did not log into facebook
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