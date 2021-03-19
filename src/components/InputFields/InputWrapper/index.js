import React from 'react'
import styles from './index.module.css'

const InputWrapper = ({ children, isVisible, placeholder }) => {
    return (
        <div className={styles.container}>
            <fieldset className={styles['inner-container']}>
                    <legend className={styles['legend-wrapper']}>
                        {isVisible && <blockquote className={styles.legend}>{placeholder}</blockquote>}
                    </legend>

                {children}
            </fieldset>
        </div>
    )
}

export default InputWrapper