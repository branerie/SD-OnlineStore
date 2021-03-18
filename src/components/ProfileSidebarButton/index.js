import React from 'react'
import styles from './index.module.css'

const ProfileSidebarButton = ({ text, isSelected, onClick, style, historyId }) => {
    return (
        <button
            key={historyId}
            className={`${styles['btn-sidebar']} ${isSelected ? styles.selected : null}`}
            onClick={onClick}
            disabled={isSelected}
            style={style}
        >
            {text}
        </button>
    )
}

export default ProfileSidebarButton