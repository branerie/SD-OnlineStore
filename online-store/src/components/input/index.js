import React, { useState } from 'react'

const Input = ({label, id, value, onChange, type, maxLength}) => {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <input type={type} id={id} value={value} onChange={onChange} maxLength={maxLength} />
        </div>
    )
}

export default Input