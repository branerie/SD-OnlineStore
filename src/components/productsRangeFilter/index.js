import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import RangeInput from '../inputFields/rangeInput'

const getInitialValues = (filters, propName, min, max) => {
    const currentFilters = filters.range[propName]

    if (currentFilters) {
        return [currentFilters.min, currentFilters.max]
    }

    return [min, max]
}

const ProductsRangeFilter = ({ min, max, propName, title, step = 1 }) => {
    const { filters, filtersDispatch } = useContext(ProductsContext)
    const [value, setValue] = useState(getInitialValues(filters, propName, min, max))

    const handleChange = (event, newValue) => {
        filtersDispatch({
            type: 'range',
            propName: propName,
            value: { min: newValue[0], max: newValue[1] }
        })

        setValue(newValue)
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <RangeInput
                value={value}
                handleChange={handleChange}
                rangeStart={min}
                rangeEnd={max}
                rangeStep={step}
                units='$'
            />
        </div>
    )
}

export default ProductsRangeFilter