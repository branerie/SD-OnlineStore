import React from 'react'
import styles from './index.module.css'

const ProductsCheckboxFilterRow = ({ value, propName, checked, onChange, testId }) => {
    return (
        <label key={`${propName}_${value}_label`} className={styles.container}>
            <span className={styles['box-name']}>{value}</span>
            <input
                type="checkbox"
                value={value}
                name={propName}
                checked={checked}
                onChange={onChange}
                data-testid={testId}
            />
            <span className={styles.checkmark}></span>
        </label>
    )
}

export default ProductsCheckboxFilterRow