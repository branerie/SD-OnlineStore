import React from 'react'
import styles from './index.module.css'

const SizeButton = ({ isSelected, handleSelect, sizeName }) => {
    return (
        <div
            className={isSelected 
                ? [styles.size, styles.selected].join(' ') 
                : styles.size
            }
            onClick={() => handleSelect(sizeName)}
        >
            {sizeName}
        </div>
    )
}

export default SizeButton