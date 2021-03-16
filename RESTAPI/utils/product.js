const NUMBER_REGEX = /\d+/

const getSizeRange = (size) => {
    const rangeCeiling = Math.ceil(size / 5) * 5
    return `${rangeCeiling - 4} - ${rangeCeiling}`
}

const sortSizes = (a, b) => {
    const firstSizeFirstDigit = Number(a[0])
    const secondSizeFirstDigit = Number(b[0])

    if (!isNaN(firstSizeFirstDigit) && !isNaN(secondSizeFirstDigit)) {
        // in case both sizes are number ranges, we sort them as numbers
        const firstRangeFirstNumber = Number(NUMBER_REGEX.exec(a))
        const secondRangeFirstNumber = Number(NUMBER_REGEX.exec(b))

        return firstRangeFirstNumber - secondRangeFirstNumber
    }
    
    else if (!isNaN(firstSizeFirstDigit) || !isNaN(secondSizeFirstDigit)) {
        // In case one of the sizes is a number range, 
        // we want to put it before the other sizes ("L", "XL") in the sorted list 
        return a[0].localeCompare(b[0])
    }

    firstSizeLastLetter = a[a.length - 1]
    secondSizeLastLetter = b[b.length - 1]

    // We have dealt with the number ranges (41-46 etc.), so we check if 
    // the last letter of the sizes is different. If so, we have are, e.g., 
    // comparing size M with size L. Therefore, we can ignore the number of
    // X's in front of it (e.g. XS/XXL) and just compare the last letter (S/M/L) 
    if (firstSizeLastLetter !== secondSizeLastLetter) {
        return secondSizeLastLetter.localeCompare(firstSizeLastLetter)
    }

    // We have the same size division (S/M/L). In case the size is S, XS is smaller
    // than S, but in case it's not S it's the other way around (XL is larger than L
    // and XXL is larger than XL)
    if (firstSizeLastLetter === 'S') {
        return b.slice(0, b.length - 1)
                .localeCompare(a.slice(0, a.length - 1))
    }

    return a.slice(0, a.length - 1)
            .localeCompare(b.slice(0, b.length - 1))
}

const getImageUrl = (path) => {
    return `http://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${path}`
}

const getImagePublicIdFromPath = (path) => {
    const imageName = path.split('/')[1]
    return imageName.split('.')[0]
}

const getAllCategories = () => {
    return [
        'Shoes',
        'Bags',
        'T-shirts',
        'Bathing suits',
        'Dresses',
        'Jeans',
        'Jackets',
        'Shirts',
    ]
}

const parseFullMongoProducts = (mongoProducts) => {
    return mongoProducts.map(p => {
        const parsedProduct = {
            id: p._id,
            price: p.price,
            brand: p.brand,
            description: p.description,
            gender: p.gender,
            categories: p.categories,
            ratingStars: p.ratingStars,
            ratingCount: p.rating ? (p.rating.counter || 0) : 0
        }

        parsedProduct.sizes = Array.from(p.sizes)
                                //    .filter(s => s.count > 0)
                                   .map(s => ({  sizeName: s.sizeName, count: s.count }))
                                   .sort((sizeA, sizeB) => sortSizes(sizeA.sizeName, sizeB.sizeName))

        if (p.discount && p.discount.percent) {
            parsedProduct.discount = {
                percent: p.discount.percent * 100,
                endDate: p.discount.endDate.toISOString().slice(0, 10)
            }

            parsedProduct.discountPrice = p.discountPrice
        }

        if (p.images.length > 0) {
            parsedProduct.images = p.images.map(image => getImageUrl(image))
        }

        return parsedProduct
    })
}

const parseCartMongoProducts = (mongoProducts) => {
    return mongoProducts.map(p => {
        const productInfo = {
            productId: p._id,
            brand: p.brand,
            description: p.description,
            price: p.price,
            image: p.images.length > 0 ? getImageUrl(p.images[0]) : null
        }

        productInfo.sizes = Array.from(p.sizes)
                                //  .filter(s => s.count > 0)
                                 .map(s => ({ sizeName: s.sizeName, count: s.count}))
                                 .sort((sizeA, sizeB) => sortSizes(sizeA.sizeName, sizeB.sizeName))
        
        if (p.discountPrice !== p.price) {
            productInfo.discountPrice = p.discountPrice
        }

        return productInfo
    })
}

const getCartItemsInfo = (products, userCart) => {
    const itemsInfo = products.reduce((acc, item) => {
        const discountPrice = item.discount && item.discount.percent 
                                ? item.price * (1 - item.discount.percent)
                                : item.price

        return { 
            ...acc, 
            [item._id]: { price: item.price, discountPrice } 
        }
    }, {})

    const cartItems = userCart.map(c => { 
        return { 
            productId: c.productId, 
            sizeName: c.sizeName, 
            quantity: c.quantity, 
            ...itemsInfo[c.productId] 
        }
    })

    return Array.from(cartItems)
}

const getCartItemsByProductId = (cart) => {
    return cart.reduce((acc, cartItem) => {
        const productId = cartItem.productId 
        return acc[productId] 
        ? { 
            ...acc, 
            [productId]: [ 
                ...acc[productId], 
                [cartItem.sizeName, cartItem.quantity] 
            ] 
        } 
        : {
            ...acc, 
            [productId]: [ [cartItem.sizeName, cartItem.quantity] ] 
        }

    }, {})  
}

module.exports = {
    getSizeRange,
    sortSizes,
    getImageUrl,
    getImagePublicIdFromPath,
    getAllCategories,
    parseFullMongoProducts,
    parseCartMongoProducts,
    getCartItemsInfo,
    getCartItemsByProductId
}