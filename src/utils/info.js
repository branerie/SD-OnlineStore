const parseValidationConstants = (constants) => {
    const parsedConstants = {...constants}

    for (let fieldName of Object.keys(parsedConstants)) {
        if (parsedConstants[fieldName].hasOwnProperty('pattern')) {
            // regex patterns are sent as regular strings
            // and need to be converted to regex
            parsedConstants[fieldName].pattern.value = 
                new RegExp(parsedConstants[fieldName].pattern.value)
        }

        if (parsedConstants[fieldName].hasOwnProperty('patterns')) {
            /*
                If we want to display separate error messages for different
                pattern validations, we use the "patterns" property, which should
                hold an array of objects with keys ["name", "value", "message"]. The
                "value" property is a string which needs to be turned into a regex,
                the "message" is the error message that we wish to display and "name"
                is a key to put in the "validate" field which we need to create. We need
                to create this field (and delete "patterns") because that is the field we
                need to use in order for 'react-hook-form' to work with multiple patterns
            */
            parsedConstants[fieldName].validate = {}
            const validate = parsedConstants[fieldName].validate

            for (let pattern of parsedConstants[fieldName].patterns) {
                const regex = new RegExp(pattern.value)
                // The validate prop of 'react-hook-form' works with functions
                validate[[pattern.name]] = (value) => regex.test(value) || pattern.message
            }

            delete parsedConstants[fieldName].patterns
        }
    }

    return parsedConstants
}

export {
    parseValidationConstants
}