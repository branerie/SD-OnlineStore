import getCookie from "./cookie"

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

const getProductFromDb = async () => {
    const promise = await fetch('http://localhost:3001/api/product/ranges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const products= await promise.json()

    return products
}

export {
    getProductRanges,
    getProductFromDb
}