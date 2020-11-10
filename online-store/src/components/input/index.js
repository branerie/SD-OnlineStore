import React from 'react'

const Input = ({label, id, value, onChange, onBlur, type, maxLength}) => {
    return (
        <div>
            <label htmlFor={id}>{label}:
            <input type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength} />
        </label>
        </div>
    )
}

export default Input