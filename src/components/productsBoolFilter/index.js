import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'

const ProductsBoolFilter = ({ propName, title }) => {
    const { filters, filtersDispatch } = useContext(ProductsContext)
    const [value, setValue] = useState(filters.bool.includes(propName))

    const handleChange = (event) => {
        const isActivated = event.target.checked

        filtersDispatch({ type: 'bool', propName: propName, isActivated })
        setValue(isActivated)
    }

    return (
        <div>
            <h3 className={styles.title}>{title}</h3>
            <input
                name={propName}
                value={value}
                checked={value}
                type="checkbox"
                onChange={handleChange}
                data-testid={`bool-${propName}`}
            />
        </div>
    )
}

export default ProductsBoolFilter