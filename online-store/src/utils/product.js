import getCookie from "./cookie"

const getCategoricalFilterQueries = (categoricalFilters) => {
    const propNames = Object.keys(categoricalFilters)
    const queryStrings = propNames.map(propName => {
        return `cat_${propName}=${categoricalFilters[propName].join(',')}`
    })
    
    return queryStrings
}

const getRangeFilterQueries = (rangeFilters) => {
    const propNames = Object.keys(rangeFilters)
    const queryStrings = propNames.map(propName => {
        return `rng_${propName}=${rangeFilters[propName].min},${rangeFilters[propName].max}`
    })

    return queryStrings
}

const getBoolFilterQueries = (boolFilters) => {
    const queryStrings = boolFilters.map(propName => {
        return `is_${propName}=${true}`
    })

    return queryStrings
}

const getProductRanges = async () => {
    const promise = await fetch('http://localhost:3001/api/product/ranges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('x-auth-cookie')
        }
    })
    const products = await promise.json()
    return products
}

const getProductsPage = async (categoricalFilters, rangeFilters, boolFilters, page, pageLength) => {
    const queryStringArray = [
        ...getCategoricalFilterQueries(categoricalFilters),
        ...getRangeFilterQueries(rangeFilters),
        ...getBoolFilterQueries(boolFilters),
        `page=${page}&pageLength=${pageLength}`
    ]

    const queryString = queryStringArray.join('&')
    
    const promise = await fetch(`http://localhost:3001/api/product/products?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const products = await promise.json()
    return products
}

const getProductImages = async (productId) => {
    const promise = await fetch(`http://localhost:3001/api/product/${productId}/images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const images = await promise.json()
    return images
}

const addImageToProduct = async (productId, imagePath) => {
    const result = await fetch(`http://localhost:3001/api/admin/product/${productId}/images`, {
        method: 'POST',
        body: {
            path: imagePath
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getImagePath = (url) => {
    const urlParts = url.split('/')
    return urlParts.slice(urlParts.length - 2).join('/')
}

const getImagePublicId = (url) => {
    const urlParts = url.split('/')
    const imageName = urlParts[urlParts.length - 1]
    return imageName.split('.')[0]
}

export {
    getProductRanges,
    getProductsPage,
    getProductImages,
    getImagePath,
    getImagePublicId
}