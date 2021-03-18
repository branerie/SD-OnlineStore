import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'
import ProductsCheckboxFilterRow from '../productsCheckboxFilterRow'

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

    return (
        <div className={styles['check-box']}>
            <h3 className={styles.title}>{title}</h3>
            {values.map(value => {
                return (
                    <ProductsCheckboxFilterRow
                        key={`${propName}_${value}`}
                        value={value}
                        propName={propName}
                        checked={currValues.includes(value)}
                        onChange={handleChange}
                        testId={`${title.toLowerCase()}-${value.replace(' ', '_').toLowerCase()}`}
                    />
                )
            })}
        </div>
    )
}

export default ProductsCheckboxFilter