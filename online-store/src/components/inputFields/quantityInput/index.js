import React from 'react'

import styles from './index.module.css'

const QuantityInput = ({ value, name, setNewValue, max }) => {
    const changeValue = (newValue) => {
        let numberValue = Number(newValue)
        if (!numberValue && numberValue !== 0) {
            return
        }

        if (newValue < 0) {
            numberValue = 0
        }

        setNewValue(numberValue)
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>{name}</label>
            <button
                type="button"
                className={[styles.sign, styles['btn-left']].join(' ')}
                onClick={() => changeValue(Number(value) - 1)}>-</button>
            <input
                type='number'
                name={name}
                min='0'
                max={max}
                value={value}
                className={[styles['input-field']].join(' ')}
                pattern='[0-9]+'
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