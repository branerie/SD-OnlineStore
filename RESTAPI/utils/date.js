/* Returns 1 if firstDate is larger, -1 if secondDate is larger
and 0 if the year, month and day of both dates are equal (ignores time)
*/
const compareDates = (firstDate, secondDate) => {
    const firstDateYear = firstDate.getYear()
    const secondDateYear = secondDate.getYear()

    if (firstDateYear !== secondDateYear) {
        return 1 - 2 * (secondDateYear > firstDateYear)
    }

    const firstDateMonth = firstDate.getMonth()
    const secondDateMonth = secondDate.getMonth() 
    
    if (firstDateMonth !== secondDateMonth) {
        return 1 - 2 * (secondDateMonth > firstDateMonth)
    }

    const firstDateDay = firstDate.getDate()
    const secondDateDay = secondDate.getDate()

    if (firstDateDay !== secondDateDay) {
        return 1 - 2 * (secondDateDay > firstDateDay)
    }

    return 0
}

module.exports = {
    compareDates
}