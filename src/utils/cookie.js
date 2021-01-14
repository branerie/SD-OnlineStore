const DURATION_ERROR = 'Invalid cookie duration'

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : '';
}

const setCookie = (cookieName, cookieValue, duration) => {
    /* duration - a string consisting of two characters. The first should be
    an integer number, representing the amount of timesteps we wish the expiration
    date to be ahead of the current date, and the second should be one of three characters, 
    representing size of one timestep:
        1) "h" - hours
        2) "d" - days
        3) "w" - weeks
    */
    const durationAmount = parseInt(duration.slice(0, duration.length - 1))
    if (isNaN(durationAmount)) {
        throw new Error(DURATION_ERROR)
    }

    const expirationDate = new Date()
    let time = expirationDate.getTime()
    switch(duration[duration.length - 1]) {
        // adds number of milliseconds in day/hour/week * amount
        // to current date
        case 'd':
            time += 86400000 * durationAmount
            break
        case 'h':
            time += 3600000 * durationAmount
            break
        case 'w':
            time += 604800000 * durationAmount
            break
        default:
            throw new Error(DURATION_ERROR)
    }

    expirationDate.setTime(time)
    document.cookie = `${cookieName}=${cookieValue};expires=${expirationDate.toUTCString()};path=/`
}

export { 
    getCookie,
    setCookie
}