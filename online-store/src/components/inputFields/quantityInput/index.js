import React, { useState } from 'react'
import styles from './index.module.css'

import plusSign from '../../../images/plus.png'
import minusSign from '../../../images/minus.png'

const QuantityInput = ({ value, name, setNewValue }) => {
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
            {/* <button  className={styles.minus}> */}
            {/* </button> */}
            <input
                type='text'
                name={name}
                min='0'
                max='99999'
                value={value}
                className={styles['input-field']}
                pattern='[0-9]+'
                onChange={e => setNewValue(e.target.value)} />
            {/* <button className={styles.plus}> */}
            <img
                src={minusSign}
                className={styles['minus-sign']}
                width='10'
                height='10'
                onClick={() => changeValue(Number(value) - 1)} />
            <img
                src={plusSign}
                className={styles['plus-sign']}
                width='50'
                height='50'
                onClick={() => changeValue(Number(value) + 1)} />
            {/* </button> */}
        </div>
    )
}

export default QuantityInput