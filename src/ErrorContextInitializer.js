import React, { useCallback, useState } from 'react'
import ErrorContext from './ErrorContext'

const ErrorContextInitializer = ({ children }) => {
    const [messages, setMessages] = useState([])

    const closeMessage = (msgName) => setMessages(messages.filter(msg => msg.name !== msgName))

    const addMessage = useCallback((name, text) => {
        if (messages.some(msg => msg.name === name)) {
            return
        }

        setMessages([...messages, { name, text }])
    }, [messages])

    return (
        <ErrorContext.Provider value={{ messages, addMessage, closeMessage }}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextInitializer