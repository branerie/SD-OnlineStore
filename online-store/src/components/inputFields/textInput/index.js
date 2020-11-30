import React, { useState } from 'react'
import styles from './index.module.css'
import inputStyles from '../index.module.css'

const TextInput = ({ value, onChange, onBlur, type, maxLength, placeholder, ref }) => {
    const [isVisible, setIsVisible] = useState(value != undefined)

    const handleChange = (event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        onChange(event)
    }

    return (
        <div className={styles.container}>
            <fieldset className={styles['inner-container']}>
                {isVisible && 
                    <legend>
                        <small>{placeholder}</small>
                    </legend>}

                <input 
                    type={type}
                    className={inputStyles.input}
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    placeholder={placeholder} />
            </fieldset>
        </div>
    )
}

export default TextInput