import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'

const ProductsBoolFilter = (props) => {
    const [value, setValue] = useState(false)
    const productsContext = useContext(ProductsContext)

    const handleChange = (event) => {
        const isActivated = event.target.checked

        productsContext.filtersDispatch({ type: 'bool', propName: props.propName, isActivated })
        setValue(isActivated)
    }

    return (
        <div>
            <h3 className={styles.title}>{props.title}</h3>
            <input
            name={props.propName}
            value={value}
            type="checkbox"
            onChange={handleChange}
         />
        </div>
    )
}

export default ProductsBoolFilter