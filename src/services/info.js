import { REST_API_URL } from '../utils/constants'
import { parseValidationConstants } from '../utils/info'

const INFO_URL = REST_API_URL + '/info'

const getValidationConstants = async (model) => {
    const response = await fetch(`${INFO_URL}/validation/${model}`, {
        method: 'GET'
    })

    const result = await response.json()
    if (!result.error) {
        return parseValidationConstants(result)
    }

    return result
}

export {
    getValidationConstants
}