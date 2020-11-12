import React, { useState } from 'react'

const ProductsBoolFilter = (props) => {
    const [value, setValue] = useState(false)

    const handleChange = (event) => {
        const newValue = event.target.checked
        props.onChange(props.propName, newValue)
        setValue(newValue)
    }

    return (
        <div>
            <span>{props.title}</span>
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