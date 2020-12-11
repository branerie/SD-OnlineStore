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

        if (sizeRange.length === 1) {
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

        if (property === 'searchTerm' && query[property] !== '') {
            filter['$text'] = { $search: query[property] }
            continue
        }

        // database schema does not contain this property
        // therefore, we don't try to filter by it
        if (!propValue || !isProductSchemaField(propValue)) {
            continue
        }

        if (propType === 'cat') {
            if (propValue === 'sizes') {
                filter['sizes.sizeName'] = parseSizeFilters(query[property])
            } else if (propValue === 'rating') {
                filter['ratingStars'] = {
                    $in: query[property].split(',').map(Number)
                }
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

            const finalPropValue = propValue === 'price' ? 'discountPrice' : propValue

            filter[finalPropValue] = {
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

function getSortCriteria(sortQuery) {
    const [property, direction] = sortQuery.split(',')
    const integerDirection = direction === 'asc' ? 1 : -1
    return { [property]: integerDirection, _id: 1 }
}

function getProductsAggregationObject(productFilters, sortCriteria, page, pageLength) {
    const resultArray = []
    const fullProducts = []
    const totalCount = []

    if ('$text' in productFilters) {
        const textMatch = { $match: { $text: productFilters.$text } }
        const textScore = { $addFields: {score: {$meta: "textScore"}}}

        resultArray.push(textMatch)
        resultArray.push(textScore)

        productFilters = {...productFilters}
        delete productFilters.$text
    }

    const fieldsToCreateForProducts = {
        $addFields: {
            discountPrice: {
                $round: [
                    {
                        $multiply: ['$price', { $subtract: [1, { $ifNull: ['$discount.percent', 0] }] }]
                    },
                    2
                ]
            },
            ratingStars: {
                $round: [
                    {
                        $divide: ['$rating.currentRating', { $max: ['$rating.counter', 1] }]
                    },
                    0
                ]
            }
        }
    }

    fullProducts.push(fieldsToCreateForProducts)

    const fieldsToCreateForCount = { $addFields: { } }
    let shouldCreateFields = false
    if (productFilters.hasOwnProperty('discountPrice')) {
        fieldsToCreateForCount.$addFields.discountPrice = 
                    fieldsToCreateForProducts.$addFields.discountPrice
        shouldCreateFields = true
    }

    if (productFilters.hasOwnProperty('ratingStars')) {
        fieldsToCreateForCount.$addFields.ratingStars = 
                    fieldsToCreateForProducts.$addFields.ratingStars
        shouldCreateFields = true
    }

    if (shouldCreateFields) {
        totalCount.push(fieldsToCreateForCount)
    }

    const matchPhase = { $match: productFilters }
    
    fullProducts.push(matchPhase)
    totalCount.push(matchPhase)

    fullProducts.push({ $sort: sortCriteria })
    fullProducts.push({ $skip: page * pageLength })
    fullProducts.push({ $limit: pageLength })

    totalCount.push({
        $group: {
            _id: null,
            count: { $sum: 1 }
        }
    })

    totalCount.push({
        $project: {
            _id: 0,
            count: '$count'
        }
    })

    resultArray.push({
        $facet: {
            fullProducts,
            totalCount
        }
    })

    return resultArray
}

module.exports = {
    getDbProductsFilter,
    getSortCriteria,
    getProductsAggregationObject
} 
