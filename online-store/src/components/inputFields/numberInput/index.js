import React,  { useState } from 'react'
import styles from './index.module.css'
import inputStyles from '../index.module.css'
import InputWrapper from '../inputWrapper'

const NumberInput = ({ value, placeholder, min, max, onChange, onBlur, ref, unitsPlaceholder }) => {
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
        <InputWrapper isVisible={isVisible} placeholder={placeholder}>
            <div className={styles.container}>
                <input
                    type='number'
                    className={[styles['number-input'], inputStyles.input].join(' ')}
                    value={value}
                    placeholder={placeholder}
                    min={min}
                    step='0.01'
                    max={max}
                    onChange={handleChange}
                    onBlur={onBlur}
                    ref={ref}
                />
                <span className={styles.units}>
                    <span>
                        {unitsPlaceholder}
                    </span>
                </span>
            </div>
        </InputWrapper>
    )
}

export default NumberInput