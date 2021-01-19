import React from 'react'

const ErrorContext = React.createContext({
    message: null,
    setMessage: () => {}
})

export default ErrorContext