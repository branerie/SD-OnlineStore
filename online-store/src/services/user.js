import { REST_API_URL, HTTP_HEADERS, JSON_CONTENT_TYPE, AUTH_COOKIE_NAME } from '../utils/constants'
import getCookie from '../utils/cookie'

const USER_URL = REST_API_URL + '/user'

const verifyUser = async () => {
    const response = await fetch(`${USER_URL}/verify`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME) || ''
        }
    })

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

    const token = response.headers.get(HTTP_HEADERS.AUTHORIZATION)
    document.cookie = `${AUTH_COOKIE_NAME}=${token};`

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
        const token = response.headers.get('Authorization')
        document.cookie = `x-auth-cookie=${token};`
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

export {
    verifyUser,
    logInUser,
    registerUser,
    setFavorites
}