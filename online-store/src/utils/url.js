function parseQueryString(queryString) {
    let queryPairs = queryString.replace('?', '').split('&')

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

            // if result already has this key, we must append
            // otherwise, simply add the key-value pair to the result object
            if (result.hasOwnProperty(filterType)) {
                result[[filterType]][[filterProp]] = values
            } else {
                result[[filterType]] = { [filterProp]: values }
            }
        } else {
            result[[key]] = value
        }
    }

    //TODO: Figure out a better way to filter by boolean
    if (result.bool) {
        result.bool = Object.keys(result.bool)
    }

    return result
}

export {
    parseQueryString
}