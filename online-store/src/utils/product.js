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

const getProductsQueryString = ({ bool, cat, range, search, sort }, page, pageLength) => {
    const queryStringArray = [
        ...getCategoricalFilterQueries(cat),
        ...getRangeFilterQueries(range),
        ...getBoolFilterQueries(bool),
        `page=${page}&pageLength=${pageLength}&sort=${sort[0]}_${sort[1]}`
    ]

    if (search) {
        queryStringArray.push(`searchTerm=${search}`)
    }

    return queryStringArray.join('&')
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
    getImagePath,
    getImagePublicId,
    getProductsQueryString,
}