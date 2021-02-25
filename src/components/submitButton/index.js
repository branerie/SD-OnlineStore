import React from 'react'
import styles from './index.module.css'

const SubmitButton = ({ text, style, disabled, onClick }) => {
    return (
        <button 
            onClick={onClick}
            type='submit'
            className={`${styles.button} ${disabled && styles.disabled}`} 
            style={style} 
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default SubmitButton