import React, { useState } from 'react'
import ErrorContext from './ErrorContext'

const ErrorContextInitializer = ({ children }) => {
    const [message, setMessage] = useState(null)

    return (
        <ErrorContext.Provider value={{ message, setMessage }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextInitializer