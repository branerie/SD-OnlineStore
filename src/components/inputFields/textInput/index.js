import React, { useState } from 'react'
import inputStyles from '../index.module.css'
import InputWrapper from '../inputWrapper'

const TextInput = ({
    name,
    value,
    onChange,
    onBlur,
    onKeyDown,
    maxLength,
    placeholder,
    reference,
    autoFocus = false,
    type = 'text',
    disabled = false
}) => {
    const [isVisible, setIsVisible] = useState(!!value)

    const handleChange = (event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        if (onChange) {
            onChange(event)
        }
    }

    return (
        <InputWrapper isVisible={isVisible} placeholder={placeholder} >
            <input
                name={name}
                type={type}
                className={inputStyles.input}
                ref={reference}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
            />
        </InputWrapper>
    )
}

export default TextInput