import React, { useState } from 'react'
import styles from './index.module.css'

const ErrorMessage = ({ text, handleClose }) => {
    const [timeout] = useState(window.setTimeout(handleClose, 10000))

    const handleWindowClose = () => {
        window.clearTimeout(timeout)
        handleClose()
    }

    return (
        <div className={styles.container}>
            <div className={styles['btn-close']} onClick={handleWindowClose}>x</div>
            {/* <div className={styles['btn-close']} onClick={handleClose}>x</div> */}
            {text}
        </div>
    )
}

export default ErrorMessage