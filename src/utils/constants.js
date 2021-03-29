const AUTH_COOKIE_NAME = 'x-auth-cookie'
const CART_COOKIE_NAME = 'cart'
const REST_API_URL = process.env.NODE_ENV === 'development'
                            ? 'http://localhost:3001/api'
                            : '/api'
                            
const JSON_CONTENT_TYPE = 'application/json'

const CLOUDINARY_CLOUD_NAME = 'drk3sslgq'
const CLOUDINARY_UPLOAD_PRESET = 'j8qqeqco'

const USER_NOT_LOGGED_IN_ERROR = 'User is not logged in'

const HTTP_HEADERS = {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type'
}

export {
    AUTH_COOKIE_NAME,
    CART_COOKIE_NAME,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET,
    HTTP_HEADERS,
    JSON_CONTENT_TYPE,
    REST_API_URL,
    USER_NOT_LOGGED_IN_ERROR,
}