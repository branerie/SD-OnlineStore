import React from 'react'

import styles from './index.module.css'

const QuantityInput = ({ 
    value, 
    name, 
    label, 
    setNewValue, 
    reference, 
    style, 
    max = 9999, 
    min = 0 
}) => {
    const changeValue = (newValue) => {
        // allows changes that are not within min/max if passed value is not itself within min/max
        // to allow user to adjust the value to the acceptable range if its initial value is not acceptable
        // (such as when total quantity of an item in shopping cart decreased to below the quantity that the
        // user wanted to buy)
        if ((value >= min && value <= max) &&
            (isNaN(newValue) || newValue < min || newValue > max)) {
            return
        }

        setNewValue(newValue)
    }

    return (
        <div className={styles.container} style={style}>
            {label && <label className={styles.label}>{label}</label>}
            <button
                type="button"
                className={[styles.sign, styles['btn-left']].join(' ')}
                onClick={() => changeValue(Number(value) - 1)}>
                -
            </button>
            <input
                type='number'
                name={name}
                min={min}
                max={max}
                value={value}
                className={styles['input-field']}
                pattern='[0-9]+'
                ref={reference}
                onChange={e => changeValue(Number(e.target.value))} 
            />
            <button
                type="button"
                className={[styles.sign, styles['btn-right']].join(' ')}
                value="+"
                onClick={() => changeValue(Number(value) + 1)}>
                +
            </button>
        </div>
    )
}

export default QuantityInput