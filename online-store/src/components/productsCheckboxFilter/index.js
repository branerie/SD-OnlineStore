import React from 'react'

const ProductsCheckboxFilter = (props) => {
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
                                data-prop-name={props.propName}
                                onChange={props.onChange} />
                            <span>{value}</span>
                        </div>
                    )
                })}
            </div>
        )
}

export default ProductsCheckboxFilter