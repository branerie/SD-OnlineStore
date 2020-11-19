import React, { useContext, useState } from 'react'
import ProductsContext from '../../ProductsContext'

const ProductsRangeFilter = (props) => {
    const [minValue, setMinValue] = useState(props.min)
    const [maxValue, setMaxValue] = useState(props.max)
    const productsContext = useContext(ProductsContext)
    
    const capitalizedPropName = props.propName[0].toUpperCase() + props.propName.slice(1)

    const handleChange = () => {
        productsContext.filtersDispatch({
            type: 'range',
            propName: props.propName,
            value: { min: minValue, max: maxValue }
        })
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input
                type="number"
                name={`min${capitalizedPropName}`}
                value={minValue}
                min="0"
                max={props.max}
                onChange={e => setMinValue(e.target.value)} 
                onBlur={handleChange} />
            <input
                type="number"
                name={`max${capitalizedPropName}`}
                value={maxValue}
                min="0"
                max={props.max}
                onChange={e => setMaxValue(e.target.value)}
                onBlur={() => props.onChange(props.propName, { min: minValue, max: maxValue })} />
        </div>
    )
}

export default ProductsRangeFilter