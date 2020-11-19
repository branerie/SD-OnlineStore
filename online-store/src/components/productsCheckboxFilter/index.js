import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'

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
            <h3>{props.title}</h3>
            {props.values.map(value => {
                return (
                    <div key={value}>
                        <input
                            type="checkbox"
                            value={value}
                            name={props.propName}
                            onChange={handleChange} />
                        <span>{value}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductsCheckboxFilter