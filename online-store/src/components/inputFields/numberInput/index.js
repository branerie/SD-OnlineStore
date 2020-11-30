import React from 'react' 
import styles from './index.module.css'
import inputStyles from '../index.module.css'

const NumberInput = ({ value, placeholder, min, max, onChange, onBlur, ref }) => {
    return (
        <input
            type='number'
            className={[styles['number-input'], inputStyles.input].join(' ')}
            value={value}
            placeholder={placeholder}
            min={min}
            max={max}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
        />
    )
}

export default NumberInput