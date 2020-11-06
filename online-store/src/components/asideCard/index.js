import React from 'react'

const AsideCard = (props) => {
    	return (
            <div>
                <h3>{props.title}</h3>
                {props.values.map(value => {
                    return (
                        <div>
                        <input key={value} type="checkbox" value={value} />
                        <span>{value}</span>
                        </div>
                    )
                })}
            </div>
        )
}

export default AsideCard