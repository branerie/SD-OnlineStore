import React, { useState } from 'react'
import inputStyles from '../index.module.css'
import InputWrapper from '../inputWrapper'

const TextInput = ({ value, onChange, onBlur, type, maxLength, placeholder, ref }) => {
    const [isVisible, setIsVisible] = useState(value != undefined)

    const handleChange = (event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        onChange(event)
    }

    return (
        <InputWrapper isVisible={isVisible} placeholder={placeholder} >
            <input
                type={type}
                className={inputStyles.input}
                ref={ref}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                maxLength={maxLength}
                placeholder={placeholder} />
        </InputWrapper>
    )
}

export default TextInput