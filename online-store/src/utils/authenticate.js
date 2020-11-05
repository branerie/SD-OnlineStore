const authenticate = async (url, email, password) => {

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const token = response.headers.get('Authorization')
    document.cookie = `x-auth-cookie=${token};`
    
    return  await response.json()
}

export default authenticate