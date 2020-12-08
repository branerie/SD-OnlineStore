import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

const ProductsCheckboxFilter = ({ propName, title, values }) => {
    const { filters, filtersDispatch } = useContext(ProductsContext)
    const [currValues, setCurrValues] = useState(filters.cat[propName] || [])

    const handleChange = (event) => {
        const propValue = event.target.value
        const isChecked = event.target.checked

        const newValues = isChecked
                ? [...currValues, propValue]
                : currValues.filter(v => v !== propValue)

        filtersDispatch({ type: 'cat', propName: propName, values: newValues })
        setCurrValues(newValues)
    }
    
    console.log(1)

    return (
        <div className={styles['check-box']}>
            <h3 className={styles.title}>{title}</h3>
            {values.map(value => {
                return (
                    <label key={value} className={styles.container}>
                        <span className={styles['box-name']}>{value}</span>
                        <input
                            type="checkbox"
                            value={value}
                            name={propName}
                            checked={currValues.includes(value)}
                            onChange={handleChange} />
                        <span className={styles.checkmark}></span>
                    </label>
                )
            })}
        </div>
    )
}

export default ProductsCheckboxFilter