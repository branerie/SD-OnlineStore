const shortenText = (text, maxChars) => {
    if (text.length <= maxChars) {
        return text
    }

    let maxIndex = maxChars - 1
    while (text[maxIndex] !== ' ') {
        maxIndex--
    }

    return `${text.slice(0, maxIndex)}...`
}

export {
    shortenText
}