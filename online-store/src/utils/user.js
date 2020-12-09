import getCookie from './cookie'
import { AUTH_COOKIE_NAME } from './constants'

const isUserLoggedIn = () => {
    if (getCookie(AUTH_COOKIE_NAME)) {
        return true
    }

    return false
}

export {
    isUserLoggedIn
}