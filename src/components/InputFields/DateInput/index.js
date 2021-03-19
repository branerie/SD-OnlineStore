import React from 'react'
import styles from './index.module.css'

const DateInput = ({ value, onChange }) => {
    return (
        <input
            type='date'
            value={value}
            className={styles['date-input']}
            onChange={onChange}
        />
    )
}

export default DateInput