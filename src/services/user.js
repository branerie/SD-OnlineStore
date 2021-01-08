import { REST_API_URL, HTTP_HEADERS, JSON_CONTENT_TYPE, AUTH_COOKIE_NAME } from '../utils/constants'
import getCookie from '../utils/cookie'

const USER_URL = REST_API_URL + '/user'

const setLoginCookieFromResponse = (response) => {
    const token = response.headers.get(HTTP_HEADERS.AUTHORIZATION)
    document.cookie = `${AUTH_COOKIE_NAME}=${token}`
}

const verifyUser = async () => {
    const response = await fetch(`${USER_URL}/verify`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
        }
    })

    return await response.json()
}

const confirmUser = async  (confirmationToken) => {
    const response = await fetch(`${USER_URL}/confirm`, {
        method: 'POST',
        body: JSON.stringify({ confirmationToken }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
        }
    })

    if (response.status === 200 && response.headers.authorization) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const logInUser = async (email, password) => {
    const response = await fetch(`${USER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    if (response.status === 200) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const registerUser = async (data) => {
    const response = await fetch(`${USER_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    if (response.status === 200) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const loginWithGoogle = async (token, userEmail) => {
    const response = await fetch(`${USER_URL}/login/google`, {
        method: 'POST',
        body: JSON.stringify({
            token,
            userEmail,
        }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    if (response.status === 200) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const loginWithFacebook = async (userId, email, name, signedRequest) => {
    const response = await fetch(`${USER_URL}/login/facebook`,  {
        method: 'POST',
        body: JSON.stringify({ userId, email, name, signedRequest }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    if (response.status === 200) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const setFavorites = async (productId) => {
    const response = await fetch(`${USER_URL}/favorites`, {
        method: 'PATCH',
        body: JSON.stringify({ productId }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
        }
    })

    return await response.json()
}

const sendPasswordResetEmail = async (email) => {
    const response = fetch(`${USER_URL}/password/reset/send`, {
        method: 'POST',
        body: JSON.stringify({ email })
    })

    return await response.json()
}

export {
    verifyUser,
    confirmUser,
    logInUser,
    registerUser,
    loginWithFacebook,
    loginWithGoogle,
    setFavorites,
    sendPasswordResetEmail
}