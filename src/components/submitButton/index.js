import React from 'react'
import styles from './index.module.css'

const SubmitButton = ({ text, style }) => {
    return (
        <button type='submit' className={styles.button} style={style}>{text}</button>
    )
}

export default SubmitButton