import { getCookie } from './cookie'
import { AUTH_COOKIE_NAME } from './constants'

const isUserLoggedIn = () => {
    if (getCookie(AUTH_COOKIE_NAME)) {
        return true
    }

    return false
}

const loadFacebookSDK = () => {
    const initScript = document.createElement('script')
    initScript.textContent = `
        window.fbAsyncInit = function() {
            FB.init({
                appId               : ${process.env.REACT_APP_FACEBOOK_APP_ID},
                autoLogAppEvents    : true,
                xfbml               : true,
                version             : 'v9.0'
            });
        };
    `
    const connectScript = document.createElement('script')
    connectScript.setAttribute('async', '')
    connectScript.setAttribute('defer', '')
    connectScript.setAttribute('crossorigin', 'anonymous')
    connectScript.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js')

    const body = document.getElementsByTagName('body')[0]
    const bodyFirstChild = body.firstChild

    body.insertBefore(initScript, bodyFirstChild)
    body.insertBefore(connectScript, bodyFirstChild)

    return () => {
        body.removeChild(initScript)
        body.removeChild(connectScript)
    }
}

export {
    isUserLoggedIn,
    loadFacebookSDK
}