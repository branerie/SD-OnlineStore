// User constants
const EMAIL_MAX_LENGTH = 80
const NAME_MAX_LENGTH = 30
const NAME_LENGTH_ERROR = `Name cannot be longer than ${NAME_MAX_LENGTH} symbols`
const NAME_PATTERN = '^[A-Za-z]+[-A-Za-z]?[A-Za-z]+$'
const NAME_PATTERN_ERROR = 'Name can only contain Latin letters and dash (-)'
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 60
const PASSWORD_PATTERN = `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`

// Product constants
const SIZE_MIN_LENGTH = 1
const SIZE_MAX_LENGTH = 20
const BRAND_MAX_LENGTH = 50
const DESCRIPTION_MAX_LENGTH = 1000
const DISCOUNT_PERCENT_MIN_ERROR = 'Cannot have discount lower than 1%'
const DISCOUNT_PERCENT_MAX_ERROR = 'Cannot have more than 100% discount'

const validationConstants = {
    user: {
        email: {
            maxLength: {
                value: EMAIL_MAX_LENGTH,
                message: `Email must be shorter than ${EMAIL_MAX_LENGTH} symbols.`
            },
            required: {value: true, message: 'Email is a required field'}
        },
        password: {
            executionSide: {
                backend: {
                    pattern: {
                        value: new RegExp(PASSWORD_PATTERN),
                        message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`
                    }
                },
                frontend: {
                    minLength: {
                        value: PASSWORD_MIN_LENGTH,
                        message: `Password must be at least ${PASSWORD_MIN_LENGTH} symbols long`
                    },
                    maxLength: {
                        value: PASSWORD_MAX_LENGTH,
                        message: `Password can be at most ${PASSWORD_MAX_LENGTH} symbols long`
                    },
                    patterns: [
                        {
                            name: 'lowercase',
                            value: '[a-z]',
                            message: 'Password must contain at least one lowercase letter'
                        },
                        {
                            name: 'uppercase',
                            value: '[A-Z]',
                            message: 'Password must contain at least one uppercase letter'
                        },
                        {
                            name: 'digit',
                            value: '[0-9]',
                            message: 'Password must contain at least one digit'
                        },
                        {
                            name: 'special',
                            value: '[^a-zA-Z0-9]',
                            message: 'Password must contain at least one non-alphanumeric character'
                        }
                    ]
                }
            }
        },
        firstName: {
            executionSide: {
                backend: {
                    maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: NAME_LENGTH_ERROR
                    },
                    pattern: {
                        value: new RegExp(NAME_PATTERN), 
                        message: NAME_PATTERN_ERROR
                    }
                },
                frontend: {
                    maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: NAME_LENGTH_ERROR
                    },
                    pattern: {
                        value: NAME_PATTERN, 
                        message: NAME_PATTERN_ERROR
                    }
                }
            }
        },
        lastName: {
            executionSide: {
                backend: {
                    maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: NAME_LENGTH_ERROR
                    },
                    pattern: {
                        value: new RegExp(NAME_PATTERN), 
                        message: NAME_PATTERN_ERROR
                    }
                },
                frontend: {
                    maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: NAME_LENGTH_ERROR
                    },
                    pattern: {
                        value: NAME_PATTERN, 
                        message: NAME_PATTERN_ERROR
                    }
                }
            }
        }
    },
    product: {
        price: {
            min: {
                value: 0,
                message: 'Negative price is not allowed'
            },
            required: {
                value: true,
                message: 'Price is a required field'
            }
        },
        brand: {
            required: {
                value: true,
                message: 'Brand is a required field'
            },
            maxLength: {
                value: BRAND_MAX_LENGTH,
                message: `Brand can be at most ${BRAND_MAX_LENGTH} symbols long`
            }
        },
        description: {
            required: {
                value: true,
                message: 'Description is a required field'
            },
            maxLength: {
                value: DESCRIPTION_MAX_LENGTH,
                message: `Description can be at most ${DESCRIPTION_MAX_LENGTH} symbols long`
            }
        },
        sizes: {
            sizeName: {
                required: {
                    value: true,
                    message: 'Size name is a required field'
                },
                minLength: {
                    value: SIZE_MIN_LENGTH,
                    message: `Size name must be at least ${SIZE_MIN_LENGTH} symbols long`
                },
                maxLength: {
                    value: SIZE_MAX_LENGTH,
                    message: `Size name cannot be more than ${SIZE_MAX_LENGTH} symbols long`
                }
            },
            count: {
                required: {
                    value: true,
                    message: 'Size count is a required field'
                },
                min: {
                    value: 0,
                    message: 'Cannot have negative size count'
                }
            }
        },
        discount: {
            executionSide: {
                backend: {
                    percent: {
                        min: {
                            value: 0.01,
                            message: DISCOUNT_PERCENT_MIN_ERROR
                        },
                        max: {
                            value: 1,
                            message: DISCOUNT_PERCENT_MAX_ERROR
                        }
                    }
                },
                frontend: {
                    percent: {
                        min: {
                            value: 1,
                            message: DISCOUNT_PERCENT_MIN_ERROR
                        },
                        max: {
                            value: 100,
                            message: DISCOUNT_PERCENT_MAX_ERROR
                        }
                    }
                }
            }
        }
    }
}

const getValidationConstants = (model, executionSide = 'backend') => {
    const modelValidations = {...validationConstants[model]}

    for (let key of Object.keys(modelValidations)) {
        if (modelValidations[key].hasOwnProperty('executionSide')) {
            modelValidations[key] = modelValidations[key]['executionSide'][executionSide]
        }
    }

    return modelValidations
} 

module.exports = getValidationConstants