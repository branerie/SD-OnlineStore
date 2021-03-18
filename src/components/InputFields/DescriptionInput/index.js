import React, { useCallback, useState } from 'react'
import InputWrapper from '../InputWrapper'
import styles from './index.module.css'

const DESCRIPTION_MAX_LENGTH = 1000

const DescriptionInput = ({ name, value, onChange, reference }) => {
    const [isVisible, setIsVisible] = useState(value ? true : false)

    const handleChange = useCallback((event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        if (onChange) {
            onChange(event)
        }
    }, [onChange])

    return (
        <InputWrapper isVisible={isVisible} placeholder='Description'>
            <textarea
                name={name}
                rows="5"
                value={value}
                placeholder='Description'
                onChange={handleChange}
                ref={reference}
                className={styles['description-area']}
                maxLength={DESCRIPTION_MAX_LENGTH}>
            </textarea>
        </InputWrapper>
    )
}

export default DescriptionInput