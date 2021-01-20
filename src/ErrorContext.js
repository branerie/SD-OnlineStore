import React from 'react'

const ErrorContext = React.createContext({
    messages: null,
    addMessage: () => {},
    closeMessage: () => {}
})

export default ErrorContext