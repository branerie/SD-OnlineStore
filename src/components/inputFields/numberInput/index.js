import React,  { useState } from 'react'
import styles from './index.module.css'
import inputStyles from '../index.module.css'
import InputWrapper from '../inputWrapper'

const NumberInput = ({ 
    name,
    value,
    placeholder,
    min,
    max,
    onChange,
    onBlur,
    reference,
    unitsPlaceholder,
    step = 0.01
}) => {
    const [isVisible, setIsVisible] = useState(value != undefined)

    const handleChange = (event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        if (onChange) {
            onChange(event)
        }
    }
    
    return (
        <InputWrapper isVisible={isVisible} placeholder={placeholder}>
            <div className={styles.container}>
                <input
                    name={name}
                    type='number'
                    className={[styles['number-input'], inputStyles.input].join(' ')}
                    ref={reference}
                    value={value}
                    placeholder={placeholder}
                    min={min}
                    step={step}
                    max={max}
                    onChange={handleChange}
                    onBlur={onBlur}
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