const Product = require('../models/product')
const productFields = Object.keys(Product.schema.paths)

const isProductSchemaField = (fieldName) => {
    return productFields.some(objKey => objKey.split('.')[0] === fieldName)
}

const parseSizeFilters = (queryValues) => {
    const range = (start, stop, step = 1) =>
                    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

    const sizeSet = []
    for (let queryValue of queryValues.split(',')) {
        const sizeRange = queryValue.split(' - ')

        if(sizeRange.length === 1) {
            sizeSet.push(queryValue)
        } else if (sizeRange.length === 2) {
            const [minValue, maxValue] = sizeRange.map(Number)
            sizeSet.push(...range(minValue, maxValue + 1))
        }
    }

    return {
        $in: sizeSet
    }
}

const isBoolean = (value) => /true|false/.test(value.toLowerCase())

function getDbProductsFilter(query) {
    const filter = {}
    for (const property of Object.getOwnPropertyNames(query)) {
        const [propType, propValue] = property.split('_')

        // database schema does not contain this property
        // therefore, we don't try to filter by it
        if (!propValue || !isProductSchemaField(propValue)) {
            continue
        }
        
        if (propType === 'cat') {
            if (propValue === 'sizes') {
                filter['sizes.sizeName'] = parseSizeFilters(query[property])
            } else {
                filter[propValue] = {
                    $in: query[property].split(',')
                }
            }
        } else if (propType === 'rng') {
            let [minValue, maxValue] = query[property].split(',')
                                                      .map(Number)

            // min and max value have been switched
            if (maxValue < minValue) {
                [minValue, maxValue] = [maxValue, minValue]
            }
            
            filter[propValue] = {
                $gte: minValue,
                $lte: maxValue
            }
        } else if (propType === 'is' && isBoolean(query[property])) {
            filter[propValue] = {
                $exists: query[property] === 'true'
            }
        }
    }

    return filter
}

module.exports = getDbProductsFilter