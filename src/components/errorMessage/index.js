import React, { useContext } from 'react'
import ErrorContext from '../../ErrorContext'
import styles from './index.module.css'

const ErrorMessage = () => {
    const { message } = useContext(ErrorContext)

    if (!message) {
        return null
    }

    return (
        <div className={styles.container}>
            {message}
        </div>
    )
}

export default ErrorMessage