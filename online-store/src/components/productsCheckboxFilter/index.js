import React, { useState } from 'react'

const ProductsCheckboxFilter = (props) => {
    const [values, setValues] = useState([])

    const handleChange = (event) => {
        const propValue = event.target.value
        const isChecked = event.target.checked

        const newValues = isChecked
                ? [...values, propValue]
                : values.filter(v => v !== propValue)

        props.onChange(props.propName, newValues)
        setValues(newValues)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            {props.values.map(value => {
                return (
                    <div>
                        <input
                            key={value}
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