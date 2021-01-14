import {
    REST_API_URL,
    CART_COOKIE_NAME,
    HTTP_HEADERS,
    JSON_CONTENT_TYPE,
    AUTH_COOKIE_NAME
} from '../utils/constants'
import { getCookie, setCookie } from '../utils/cookie'

const USER_URL = REST_API_URL + '/user'

const setLoginCookieFromResponse = (response) => {
    const token = response.headers.get(HTTP_HEADERS.AUTHORIZATION)
    setCookie(AUTH_COOKIE_NAME, token, '1w')
}

const verifyUser = async () => {
    const authCookie = getCookie(AUTH_COOKIE_NAME)

    if (!authCookie) {
        return { userId: null, isAdmin: false, favorites: [], cart: []}
    }

    const response = await fetch(`${USER_URL}/verify`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: authCookie
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

const logOut = async () => {
    const response = await fetch(`${USER_URL}/logout`, {
        method: 'POST',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
        }
    })

    if(response.status === 200) {
        document.cookie = `${AUTH_COOKIE_NAME}= ; expires = Thu, 01 Jan 1970 00:00:01 GMT;`
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
    const response = await fetch(`${USER_URL}/password/reset/send`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    return await response.json()
}

const resetUserPassword = async (newPassword, resetToken) => {
    const response = await fetch(`${USER_URL}/password/reset/confirm`, {
        method: 'POST',
        body: JSON.stringify({ newPassword, resetToken }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    if (response.status === 200) {
        setLoginCookieFromResponse(response)
    }

    return await response.json()
}

const getShoppingCart = async (userId) => {
    if (userId) {
        const response = await fetch(`${USER_URL}/${userId}/cart`)

        if (response.status === 204) {
            return []
        }
        
        return await response.json()
    }

    const cart = getCookie(CART_COOKIE_NAME)
    return cart
}

const addToShoppingCart = async (userId, productId, sizeName, quantity) => {
    const response = await fetch(`${USER_URL}/${userId}/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId, sizeName, quantity }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    return await response.json()
}

export {
    verifyUser,
    confirmUser,
    logInUser,
    logOut,
    registerUser,
    loginWithFacebook,
    loginWithGoogle,
    setFavorites,
    sendPasswordResetEmail,
    resetUserPassword,
    getShoppingCart,
    addToShoppingCart
}