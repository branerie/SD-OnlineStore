import React from 'react'
import styles from './index.module.css'

const SubmitButton = ({ text, type, style, disabled, onClick, btnType }) => {
    return (
        <button 
            onClick={onClick}
            type={type || 'submit'}
            className={`${styles.button} ${styles[btnType]} ${disabled && styles.disabled}`} 
            style={style} 
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default SubmitButton