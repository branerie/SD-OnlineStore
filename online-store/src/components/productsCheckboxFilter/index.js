import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

const ProductsCheckboxFilter = (props) => {
    const [values, setValues] = useState([])
    const productsContext = useContext(ProductsContext)

    const handleChange = (event) => {
        const propValue = event.target.value
        const isChecked = event.target.checked

        const newValues = isChecked
                ? [...values, propValue]
                : values.filter(v => v !== propValue)

        productsContext.filtersDispatch({ type: 'cat', propName: props.propName, values: newValues })
        setValues(newValues)
    }
    
    console.log(1)

    return (
        <div>
            <div className={styles.title}>{props.title}</div>
            {props.values.map(value => {
                return (
                    <div key={value} className={styles.container}>
                        <span>{value}</span>
                        <input
                            type="checkbox"
                            value={value}
                            name={props.propName}
                            onChange={handleChange} />
                    </div>
                )
            })}
        </div>
    )
}

export default ProductsCheckboxFilter