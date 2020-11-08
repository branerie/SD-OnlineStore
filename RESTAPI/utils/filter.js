const Product = require('../models/product')

function getDbProductsFilter(query) {
    const filter = {}
    for (const property of Object.getOwnPropertyNames(query)) {
        const [propType, propValue] = property.split('_')

        // database schema does not contain this property
        // therefore, we don't try to filter by it
        if (!propValue || !Product.schema.paths.hasOwnProperty(propValue)) {
            continue
        }

        if (propType === 'cat') {
            filter[propValue] = {
                $in: query[property].split(',')
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
        }
    }

    return filter
}

module.exports = getDbProductsFilter