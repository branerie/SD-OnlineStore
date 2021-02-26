import React from 'react'
import styles from './index.module.css'

const ProfileSidebarButton = ({ text, isSelected, onClick, style }) => {
    return (
        <button
            className={`${styles['btn-sidebar']} ${isSelected && styles.selected}`}
            onClick={onClick}
            disabled={isSelected}
            style={style}
        >
            {text}
        </button>
    )
}

export default ProfileSidebarButton