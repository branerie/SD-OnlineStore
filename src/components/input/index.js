import React from 'react'
import styles from './index.module.css'

const Input = ({
    name,
    label, 
    id, 
    value, 
    onChange, 
    onBlur, 
    type, 
    maxLength, 
    placeholder, 
    size, 
    step,
    reference
}) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id} className={styles['input-wrapper']}>
                <span className={styles.label}>{label}</span>
                <input type={type}
                        className={styles.input}
                        name={name}
                        id={id}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        size={size}
                        step={step}
                        ref={reference}
                />
        </label>
        </div>
    )
}

export default Input