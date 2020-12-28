import React from 'react'
import styles from './index.module.css'

const WindowContainer = ({ children, hideWindow }) => {
    return (
        <div className={styles.container} onClick={hideWindow}>
            <div className={styles['inner-container']} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default WindowContainer