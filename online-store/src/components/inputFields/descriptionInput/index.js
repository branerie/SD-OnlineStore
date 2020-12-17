import React, { useCallback, useState } from 'react'
import InputWrapper from '../inputWrapper'
import styles from './index.module.css'

const DESCRIPTION_MAX_LENGTH = 1000

const DescriptionInput = ({ value, onChange }) => {
    const [isVisible, setIsVisible] = useState(value ? true : false)

    const handleChange = useCallback((event) => {
        if (event.target.value.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        onChange(event)
    })

    return (
        <InputWrapper isVisible={isVisible} placeholder='Description'>
            <textarea
                rows="5"
                value={value}
                placeholder='Description'
                onChange={handleChange}
                className={styles['description-area']}
                maxLength={DESCRIPTION_MAX_LENGTH}>
            </textarea>
        </InputWrapper>
    )
}

export default DescriptionInput