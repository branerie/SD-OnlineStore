import React from 'react'
import styles from './index.module.css'

const Input = ({label, id, value, onChange, onBlur, type, maxLength, placeholder, size}) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>{label}:
            <input type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    size={size} />
        </label>
        </div>
    )
}

export default Input