import React from 'react'
import styles from './index.module.css'

const ValidationErrorMessage = ({ message }) => {
    return (
        <div className={styles.error}>
            {message}
        </div>
    )
}

export default ValidationErrorMessage