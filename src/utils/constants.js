const AUTH_COOKIE_NAME = 'x-auth-cookie'
const REST_API_URL = process.env.NODE_ENV === 'development'
                            ? 'http://localhost:3001/api'
                            : '/api'
                            
const JSON_CONTENT_TYPE = 'application/json'

const FACEBOOK_APP_ID = '1270748659962291'
const GOOGLE_CLIENT_ID = '765190029748-2kkc40ku90opksnnsa97givv1ka0td2j.apps.googleusercontent.com'

const CLOUDINARY_CLOUD_NAME = 'drk3sslgq'
const CLOUDINARY_UPLOAD_PRESET = 'j8qqeqco'

const USER_NOT_LOGGED_IN_ERROR = 'User is not logged in'

const HTTP_HEADERS = {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type'
}

export {
    AUTH_COOKIE_NAME,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET,
    FACEBOOK_APP_ID,
    GOOGLE_CLIENT_ID,
    HTTP_HEADERS,
    JSON_CONTENT_TYPE,
    REST_API_URL,
    USER_NOT_LOGGED_IN_ERROR,
}