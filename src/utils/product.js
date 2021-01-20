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
        return `bool_${propName}=${true}`
    })

    return queryStrings
}

const getProductsQueryString = ({ bool, cat, range, search, sort, page }) => {
    const queryStringArray = [
        ...getCategoricalFilterQueries(cat),
        ...getRangeFilterQueries(range),
        ...getBoolFilterQueries(bool),
        `page=${page}&sort=${sort[0]},${sort[1]}`
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

function parseQueryString(queryString) {
    if (!queryString) {
        return {}
    }

    let queryPairs = decodeURIComponent(queryString.replace('?', '')).split('&')

    if (queryPairs.length === 0 ||
        (queryPairs.length === 1 && queryPairs[0] === '')) {
        return {}
    }

    const result = {}
    for (let queryPair of queryPairs) {
        const [key, value] = queryPair.split('=')

        // if query key includes "_", then it must be a product filter
        if (key.includes('_')) {
            const [filterType, filterProp] = key.split('_')
            const values = value.split(',')


            if (!result.hasOwnProperty(filterType)) {
                result[[filterType]] = filterType === 'bool' ? [] : {}
            }

            switch (filterType) {
                case 'cat':
                    result[[filterType]][[filterProp]] = values
                    break
                case 'rng':
                    result[[filterType]][[filterProp]] = {
                        min: Number(values[0]),
                        max: Number(values[1])
                    }

                    break
                case 'bool':
                    result[[filterType]].push(filterProp)
                    break
                default:
                    continue
            }
        } else {
            result[[key]] = value
        }
    }

    return result
}

const filtersReducer = (state, action) => {
    const propName = action.propName

    switch (action.type) {
        case 'cat':
            const newCategoricalFilters = { ...state.cat }

            if (action.values.length > 0) {
                newCategoricalFilters[propName] = action.values
            } else {
                delete newCategoricalFilters[propName]
            }

            return { ...state, cat: newCategoricalFilters, page: 0 }
        case 'range':
            const newRangeFilters = { ...state.range }
            newRangeFilters[propName] = action.value

            return { ...state, range: newRangeFilters, page: 0 }
        case 'bool':
            let newBoolFilters = [...state.bool]

            if (action.isActivated) {
                newBoolFilters.push(propName)
            } else {
                newBoolFilters = newBoolFilters.filter(pn => pn !== propName)
            }

            return { ...state, bool: newBoolFilters, page: 0 }
        case 'search':
            return { ...state, search: action.searchTerm, page: 0 }
        case 'sort':
            return { ...state, sort: [action.property, action.direction], page: 0 }
        case 'page':
            return { ...state, page: action.newPage }
        case 'reset':
            return action.resetValue
        default:
            return state
    }
}

export {
    getImagePath,
    getImagePublicId,
    getProductsQueryString,
    parseQueryString,
    filtersReducer
}