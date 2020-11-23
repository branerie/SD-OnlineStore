import { REST_API_URL, HTTP_HEADERS, JSON_CONTENT_TYPE, AUTH_COOKIE_NAME } from '../utils/constants'
import getCookie from '../utils/cookie'

const verifyUser = async () => {
    const response = await fetch(`${REST_API_URL}/user/verify`, {
      method: 'GET',
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
        [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME) || ''
      }
    })
    
    return await response.json()
}

const authenticate = async (url, email, password) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    const token = response.headers.get(HTTP_HEADERS.AUTHORIZATION)
    document.cookie = `${AUTH_COOKIE_NAME}=${token};`
    
    return  await response.json()
}

export {
    verifyUser,
    authenticate
}