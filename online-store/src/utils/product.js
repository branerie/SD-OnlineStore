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

export {
    getProductRanges,
    getProductsPage
}