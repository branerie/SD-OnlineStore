import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import ProductsCheckboxFilterRow from '../productsCheckboxFilterRow'

const ProductsBoolFilter = ({ propName, title, trueTitle, falseTitle }) => {
    const { filters, filtersDispatch } = useContext(ProductsContext)
    const [value, setValue] = useState(null)

    useEffect(() => {
        const currentFilter = filters.bool.find(f => f.name === propName)
        if (!currentFilter) {
            return setValue(null)
        }

        setValue(currentFilter.value)
    }, [filters.bool, propName])

    const handleChange = (shouldSetTrue) => {
        // if there is a value already set, filter should just be unset
        const shouldUnset = (shouldSetTrue && value) || (!shouldSetTrue && value === false)
        if (shouldUnset) {
            filtersDispatch({ type: 'bool', propName })
            return setValue(null)
        }

        filtersDispatch({ type: 'bool', propName: propName, value: shouldSetTrue })
        setValue(shouldSetTrue)
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <ProductsCheckboxFilterRow
                value={trueTitle || 'Yes'}
                checked={value}
                onChange={() => handleChange(true)}
            />
            <ProductsCheckboxFilterRow
                value={falseTitle || 'No'}
                checked={value === false}
                onChange={() => handleChange(false)}
            />
        </div>
    )
}

export default ProductsBoolFilter