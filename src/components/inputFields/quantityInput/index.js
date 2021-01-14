import React from 'react'

import styles from './index.module.css'

const QuantityInput = ({ value, name, label, setNewValue, max, reference, min=0 }) => {
    const changeValue = (newValue) => {
        let numberValue = Number(newValue)
        if (!numberValue && numberValue !== 0) {
            return
        }

        if (newValue < min) {
            numberValue = min
        }

        setNewValue(numberValue)
    }

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <button
                type="button"
                className={[styles.sign, styles['btn-left']].join(' ')}
                onClick={() => changeValue(Number(value) - 1)}>-</button>
            <input
                type='number'
                name={name}
                min={min}
                max={max}
                value={value}
                className={styles['input-field']}
                pattern='[0-9]+'
                ref={reference}
                onChange={e => setNewValue(e.target.value)} />
            <button
                type="button"
                className={[styles.sign, styles['btn-right']].join(' ')}
                value="+"
                onClick={() => changeValue(Number(value) + 1)}>+</button>
        </div>
    )
}

export default QuantityInput