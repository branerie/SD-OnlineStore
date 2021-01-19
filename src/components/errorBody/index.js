import React from 'react'
import styles from './index.module.css'

const getErrorTitle = (statusCode) => {
    switch (statusCode) {
        case 400:
            return 'Bad Request'
        case 403:
            return 'Forbidden'
        case 404:
            return 'Page Not Found'
        default:
            return 'Internal Server Error'
    }
}

const INTERNAL_ERROR_MESSAGE = 'An issue has occurred on our server. Please be patient as we try to fix the problem.'

const ErrorBody = ({ status, message }) => {
    return (
        <main className={styles.container}>
            <h2 className={styles['error-title']}>
                {getErrorTitle(status)}
            </h2>
            <p>
                {message ? message : INTERNAL_ERROR_MESSAGE}
            </p>
        </main>
    )
}

export default ErrorBody