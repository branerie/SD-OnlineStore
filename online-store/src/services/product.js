import getCookie from '../utils/cookie'
import {
    REST_API_URL,
    HTTP_HEADERS,
    JSON_CONTENT_TYPE,
    CLOUDINARY_UPLOAD_PRESET,
    AUTH_COOKIE_NAME
} from '../utils/constants'
import { getProductsQueryString, getImagePath } from '../utils/product'

const PRODUCT_URL = REST_API_URL + '/product'

const uploadImages = async (images) => {
    const addedImagePaths = []
    for (let img of images) {
        //TODO: switch to signed uploads and hide cloudinary info
        const formData = new FormData()
        formData.append('file', img.file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        const response = await fetch(`https://api.cloudinary.com/v1_1/drk3sslgq/image/upload`, {
            method: 'POST',
            body: formData
        })

        const result = await response.json()
        addedImagePaths.push(getImagePath(result.url))
    }

    return addedImagePaths
}

const getProductRanges = async () => {
    const promise = await fetch(`${PRODUCT_URL}/ranges`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
            [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
        }
    })
    const products = await promise.json()
    return products
}

const getProductsPage = async (queryString) => {    
    const promise = await fetch(`${PRODUCT_URL}/products?${queryString}`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })
    
    return await promise.json()
}

const getProductImages = async (productId) => {
    const promise = await fetch(`${PRODUCT_URL}/${productId}/images`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    const images = await promise.json()
    return images
}

const getCategories = async () => {
    const response = await fetch(`${PRODUCT_URL}/categories`, {
        headers: {
            [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE
        }
    })

    const categories = await response.json()
    return categories
}

export {
    uploadImages,
    getProductImages,
    getProductsPage,
    getProductRanges,
    getCategories
}