import { AUTH_COOKIE_NAME, REST_API_URL, HTTP_HEADERS, JSON_CONTENT_TYPE } from '../utils/constants'
import getCookie from '../utils/cookie'

const ADMIN_PRODUCT_URL = REST_API_URL + '/admin/product'

const ADMIN_HEADERS = {
    [HTTP_HEADERS.CONTENT_TYPE]: JSON_CONTENT_TYPE,
    [HTTP_HEADERS.AUTHORIZATION]: getCookie(AUTH_COOKIE_NAME)
}

const removeImage = async (productId, imagePath) => {
    const removeUrl = `${ADMIN_PRODUCT_URL}/${productId}/images/${imagePath}`
    const removeResponse = await fetch(removeUrl, {
        method: 'DELETE',
        headers: ADMIN_HEADERS
    })

    return await removeResponse.json()
}

const addImagesToProduct = async (productId, imageUrls) => {
    const addImageUrl = `${ADMIN_PRODUCT_URL}/${productId}/images`
    const imagesResponse = await fetch(addImageUrl, {
        method: 'POST',
        body: JSON.stringify({ data: imageUrls }),
        headers: ADMIN_HEADERS
    })

    return await imagesResponse.json()
}

const updateProductCategories = async (productId, categoryChanges) => {
    const updateResponse = await fetch(`${ADMIN_PRODUCT_URL}/${productId}/categories`, {
        method: 'PATCH',
        body: JSON.stringify({
            operations: categoryChanges
        }),
        headers: ADMIN_HEADERS
    })

    return await updateResponse.json()
}

const updateProductSizes = async (productId, modifiedSizes) => {
    const updateResponse = await fetch(`${ADMIN_PRODUCT_URL}/${productId}/sizes`, {
        method: 'PATCH',
        body: JSON.stringify({
            operations: modifiedSizes
        }),
        headers: ADMIN_HEADERS
    })

    return await updateResponse.json()
}

const deleteProduct = async (productId) => {
    const deleteResponse = await fetch(`${ADMIN_PRODUCT_URL}/${productId}`, {
        method: 'DELETE',
        headers: ADMIN_HEADERS
    })

    return await deleteResponse.json()
}

const createProduct = async (newProduct) => {
    const productResponse = await fetch(ADMIN_PRODUCT_URL, {
        method: 'POST',
        body: JSON.stringify(
            newProduct
        ),
        headers: ADMIN_HEADERS
    })

    return await productResponse.json()
}

const updateProduct = async (productId, newProductProps) => {
    const response = await fetch(`${ADMIN_PRODUCT_URL}/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(newProductProps),
        headers: ADMIN_HEADERS
    })

    return await response.json()
}

export {
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductSizes,
    updateProductCategories,
    removeImage,
    addImagesToProduct
}